# Run after a production build: SITE_DEST=_site bundle exec ruby test/seo_test.rb
require "bundler/setup"
require "json"
require "nokogiri"
require "uri"
require "minitest/autorun"

class SeoTest < Minitest::Test
  DEST = File.expand_path(ENV.fetch("SITE_DEST", "_site"))
  ORIGIN = "https://www.aivi.fyi"

  def doc(path)
    file = File.join(DEST, path.sub(%r{^/}, ""))
    file += "index.html" if path.end_with?("/")
    file += ".html" unless File.file?(file)
    Nokogiri::HTML(File.read(file))
  end

  def meta(document, name)
    document.at_css("meta[name='#{name}'],meta[property='#{name}']")&.[]("content")
  end

  def graph(document)
    scripts = document.css('script[type="application/ld+json"]')
    assert_equal 1, scripts.size, "one non-conflicting JSON-LD graph per themed page"
    JSON.parse(scripts.first.text).fetch("@graph")
  end

  def test_sitemap_only_lists_canonical_indexable_existing_pages
    map = Nokogiri::XML(File.read(File.join(DEST, "sitemap.xml")))
    urls = map.xpath('//*[local-name()="loc"]').map(&:text)
    assert_equal urls.uniq, urls
    refute_empty urls
    %w[/skill /skill.html /404.html /page1/].each { |path| refute_includes urls, ORIGIN + path }
    urls.each do |url|
      assert url.start_with?(ORIGIN + "/"), url
      page = doc(URI(url).path)
      assert_equal [url], page.css('link[rel="canonical"]').map { |n| n["href"] }, url
      refute_match(/noindex/, meta(page, "robots").to_s, url)
      refute_empty meta(page, "description").to_s, url
      refute_empty page.at_css("html")["lang"].to_s, url
    end
  end

  def test_pagination_is_self_canonical_and_alias_is_consolidated
    root = doc("/")
    assert_equal ORIGIN + "/", doc("/page1/").at_css('link[rel="canonical"]')["href"]
    Dir.glob(File.join(DEST, "page*/index.html")).map { |p| File.basename(File.dirname(p)).delete_prefix("page").to_i }.select { |n| n > 1 }.each do |n|
      page = doc("/page#{n}/")
      assert_equal ORIGIN + "/page#{n}/", page.at_css('link[rel="canonical"]')["href"]
      assert_includes page.at_css("title").text, "第 #{n} 页"
      refute_equal root.at_css("title").text, page.at_css("title").text
      assert_operator page.css('a[href*="/page"]').size, :>, 0
    end
  end

  def test_internal_reference_and_error_page_remain_accessible_but_not_indexable
    %w[/skill /404.html].each { |path| assert_equal "noindex, follow", meta(doc(path), "robots") }
    search = JSON.parse(File.read(File.join(DEST, "assets/search.json")))
    refute search.fetch("posts").any? { |item| item.fetch("u").match?(%r{/(skill|404)(?:\.|$)}) }
  end

  def test_article_graph_links_to_visible_author_and_preserves_article_date
    page = doc("/llms/claude-fable-55-animation-review")
    nodes = graph(page)
    post = nodes.find { |n| n["@type"] == "BlogPosting" }
    person = nodes.find { |n| n["@type"] == "Person" }
    assert_equal ORIGIN + "/about/", person["url"]
    assert_equal person["@id"], post["author"].first["@id"]
    assert_equal person["url"], post["author"].first["url"]
    assert_equal "2026-10-23T22:00:00+08:00", post["datePublished"]
    assert_equal meta(page, "article:published_time"), post["datePublished"]
    assert_equal post["url"], post["mainEntityOfPage"]
    assert_equal "zh-CN", post["inLanguage"]
    assert page.css('a[href="/about/"]').any? { |a| a.text == person["name"] }
    refute post.key?("dateModified"), "do not invent an editorial update date"
    refute nodes.any? { |n| n["@type"] == "VideoObject" }, "video upload date is not the article date"
  end

  def test_profile_and_site_reference_the_same_person
    nodes = graph(doc("/about/"))
    person = nodes.find { |n| n["@type"] == "Person" }
    assert_equal person["@id"], nodes.find { |n| n["@type"] == "ProfilePage" }.dig("mainEntity", "@id")
    assert_equal person["@id"], nodes.find { |n| n["@type"] == "WebSite" }.dig("publisher", "@id")
  end

  def test_descriptions_are_distinct_and_social_image_is_real_visible_content
    assert_includes meta(doc("/aiagents/introduce-Claude-Code-PM"), "description"), "CCPM"
    flash = meta(doc("/llms/introduce-Gemini-3-Flash"), "description")
    assert_includes flash, "Gemini 3 Flash"
    refute_equal flash, meta(doc("/llms/introduce-Gemini-3-Pro"), "description")
    page = doc("/games/")
    assert_equal ORIGIN + page.at_css('.lt-games__preview img')["src"], meta(page, "og:image")
    assert_equal page.at_css('.lt-games__preview img')["alt"], meta(page, "og:image:alt")
    assert_equal "@AISuperDomain", meta(doc("/"), "twitter:site")
  end

  def test_all_json_ld_is_valid_with_unique_graph_identifiers
    count = 0
    Dir.glob(File.join(DEST, "**/*.html")).each do |path|
      page = Nokogiri::HTML(File.read(path))
      scripts = page.css('script[type="application/ld+json"]')
      next if scripts.empty?
      nodes = graph(page)
      ids = nodes.map { |n| n["@id"] }
      assert_equal ids.uniq, ids, path
      count += nodes.count { |n| n["@type"] == "BlogPosting" }
    end
    assert_operator count, :>=, 149
  end
end
