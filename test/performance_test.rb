# Run with bundle exec ruby test/performance_test.rb
require "bundler/setup"
require "jekyll"
require "minitest/autorun"
require "tmpdir"
require "fileutils"
require "ostruct"
require_relative "../_plugins/latent_performance"

class PerformanceTest < Minitest::Test
  include LatentPerformance::Filters

  def test_only_unconfigured_video_embeds_are_deferred
    html = <<~HTML
      <h2 id="-原有标题">原有标题</h2><p>正文 &amp; 链接 <a href="/old#anchor">保留</a></p>
      <iframe src="https://www.youtube.com/embed/one" title="视频" allowfullscreen></iframe>
      <iframe src="https://www.youtube-nocookie.com/embed/two" loading="eager"></iframe>
      <iframe src="https://www.youtube.com/embed/three" loading="lazy"></iframe>
      <iframe src="https://example.com/widget"></iframe>
      <pre>&lt;iframe src="https://www.youtube.com/embed/example"&gt;&lt;/iframe&gt;</pre>
    HTML
    before = Nokogiri::HTML.fragment(html)
    after = Nokogiri::HTML.fragment(lazy_video_embeds(html))
    assert_equal ["lazy", "eager", "lazy", nil], after.css("iframe").map { |n| n["loading"] }
    assert_equal before.text, after.text
    after.css("iframe").first.remove_attribute("loading")
    assert_equal before.to_html, after.to_html, "preserve URLs, anchors, text and all other attributes"
  end

  def test_already_lazy_or_non_video_content_is_returned_verbatim
    ["<p>普通正文</p>", '<iframe src="https://www.youtube.com/embed/x" loading="lazy"></iframe>',
     '<iframe src="https://example.com/widget"></iframe>'].each do |html|
      assert_equal html, lazy_video_embeds(html)
    end
  end

  def test_inline_prose_and_code_whitespace_is_preserved
    html = '<h2 id="原锚点">启用 <code>/goal</code>，继续执行</h2><ul><li><strong>提示</strong>：原文</li></ul>' +
      "<pre><code>  first\n    second\n</code></pre>" +
      '<iframe src="https://www.youtube.com/embed/video"></iframe>'
    before = Nokogiri::HTML.fragment(html)
    after = Nokogiri::HTML.fragment(lazy_video_embeds(html))
    assert_equal before.text, after.text
  end

  def build_versions(source, stamp:, css:, script: "console.log('original');", body: "文章")
    LatentPerformance::ASSETS.grep(/\.js$/).each do |path|
      file = File.join(source, path.delete_prefix("/"))
      FileUtils.mkdir_p(File.dirname(file))
      File.write(file, path.end_with?("/latent.js") ? script : "/* unchanged */")
    end
    stylesheet = OpenStruct.new(url: "/assets/css/style.css", output: css, output_ext: ".css")
    tags = LatentPerformance::ASSETS.map { |path| %(<link href="/preview#{path}?v=#{stamp}">) }.join
    page = OpenStruct.new(url: "/", output: tags + body, output_ext: ".html")
    post = OpenStruct.new(output: tags + body, output_ext: ".html")
    json = OpenStruct.new(output: %({"text":"/assets/js/latent.js?v=#{stamp}"}), output_ext: ".json")
    LatentPerformance.fingerprint_assets(OpenStruct.new(source: source, pages: [stylesheet, page, json], documents: [post]))
    assert_equal page.output, post.output
    assert_includes json.output, "?v=#{stamp}", "do not rewrite article text embedded in search or feeds"
    page.output.scan(%r{/assets/[^"']+}).to_h { |url| url.split("?v=") }
  end

  def test_versions_track_asset_bytes_not_build_time_or_articles
    Dir.mktmpdir do |dir|
      first = build_versions(dir, stamp: 100, css: "body{color:red}")
      next_build = build_versions(dir, stamp: 200, css: "body{color:red}", body: "新文章")
      assert_equal first, next_build
      changed_css = build_versions(dir, stamp: 300, css: "body{color:blue}")
      refute_equal first["/assets/css/style.css"], changed_css["/assets/css/style.css"]
      assert_equal first["/assets/js/latent.js"], changed_css["/assets/js/latent.js"]
      changed_js = build_versions(dir, stamp: 400, css: "body{color:red}", script: "console.log('changed');")
      refute_equal first["/assets/js/latent.js"], changed_js["/assets/js/latent.js"]
      assert_equal first["/assets/css/style.css"], changed_js["/assets/css/style.css"]
    end
  end
end
