# Run with: bundle exec ruby test/read_time_test.rb
require "bundler/setup"
require "jekyll"
require "minitest/autorun"

class ReadTimeTest < Minitest::Test
  SOURCE = File.expand_path("..", __dir__)
  TEMPLATE = File.read(File.join(SOURCE, "_includes/read-time.html"))

  def estimate(content, options = {}, read_time = nil)
    config = Jekyll.configuration({ "source" => SOURCE, "quiet" => true, "latent" => options })
    site = Jekyll::Site.new(config)
    Liquid::Template.parse(TEMPLATE).render!(
      { "site" => config, "include" => { "post" => { "content" => content, "read_time" => read_time } } },
      registers: { site: site }
    ).strip.to_i
  end

  def test_chinese_counts_characters_and_rounds_up
    assert_equal 1, estimate("汉" * 400)
    assert_equal 2, estimate("汉" * 401)
    assert_equal 7, estimate("汉" * 2700)
    assert_equal 2, estimate("㐀" * 401)
    assert_equal 2, estimate("𠀀" * 401)
  end

  def test_english_counts_words_and_punctuation
    assert_equal 1, estimate("word " * 200)
    assert_equal 2, estimate("word " * 201)
    assert_equal 1, estimate("don't,stop! " * 100)
  end

  def test_mixed_text_sums_durations
    assert_equal 2, estimate(("汉" * 400) + (" word" * 200))
    assert_equal 2, estimate(("汉" * 200) + (" word" * 101))
  end

  def test_empty_or_only_markup_has_minimum_one
    [nil, "", " \n ", "<div></div>", "&nbsp; " * 1000].each do |input|
      assert_equal 1, estimate(input)
    end
  end

  def test_code_and_embedded_media_do_not_add_reading_time
    code = "word " * 1200
    input = "汉" * 400 + "\n\n```ruby\n#{code}\n```\n\n`#{code}`\n"
    %w[pre code script style iframe svg video audio].each do |tag|
      input += "<#{tag}>#{code}</#{tag}>\n"
    end
    assert_equal 1, estimate(input)
    assert_equal 1, estimate("[" + ("汉" * 400) + "](https://example.com/" + code + ")")
  end

  def test_html_prose_has_same_estimate_as_markdown
    assert_equal 2, estimate("<h2>标题</h2><p>#{'汉' * 400}</p>")
    assert_equal 2, estimate("## 标题\n\n#{'汉' * 400}")
  end

  def test_configured_rates_and_explicit_override
    assert_equal 2, estimate("汉" * 400, { "chars_per_minute" => 200 })
    assert_equal 2, estimate("word " * 200, { "words_per_minute" => 100 })
    assert_equal 9, estimate("汉", {}, 9)
    assert_equal 2, estimate("汉" * 401, {}, true)
  end
end
