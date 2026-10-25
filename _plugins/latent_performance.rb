# frozen_string_literal: true

require "digest"
require "nokogiri"

module LatentPerformance
  ASSETS = %w[
    /assets/css/style.css
    /assets/js/latent.js
    /assets/js/search-ranking.js
    /assets/js/fractal-space.js
  ].freeze

  # Hash the compiled stylesheet, not only its entrypoint: imported Sass changes
  # must invalidate CSS, while publishing an article must not invalidate assets.
  def self.fingerprint_assets(site)
    versions = ASSETS.to_h do |path|
      rendered = site.pages.find { |page| page.url == path }
      bytes = rendered ? rendered.output : File.binread(File.join(site.source, path.delete_prefix("/")))
      [path, Digest::SHA256.hexdigest(bytes)[0, 16]]
    end
    (site.pages + site.documents).each do |page|
      next unless page.output_ext == ".html" && page.output

      versions.each do |path, version|
        page.output = page.output.gsub(/#{Regexp.escape(path)}\?v=\d+(?=["'])/, "#{path}?v=#{version}")
      end
    end
  end

  module Filters
    def lazy_video_embeds(html)
      return html unless html.to_s.match?(/<iframe\b/i)

      fragment = Nokogiri::HTML.fragment(html)
      videos = fragment.css("iframe").select do |frame|
        !frame.key?("loading") && frame["src"].to_s.match?(%r{\Ahttps://(?:www\.)?youtube(?:-nocookie)?\.com/embed/}i)
      end
      return html if videos.empty?

      videos.each { |frame| frame["loading"] = "lazy" }
      # Do not pretty-print: inserted whitespace can change inline prose and code.
      fragment.to_html(save_with: Nokogiri::XML::Node::SaveOptions::AS_HTML)
    end
  end
end

Liquid::Template.register_filter(LatentPerformance::Filters)
Jekyll::Hooks.register :site, :post_render do |site|
  LatentPerformance.fingerprint_assets(site)
end
