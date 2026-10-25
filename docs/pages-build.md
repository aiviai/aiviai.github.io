# Jekyll build and deployment

The site uses the vendored Latent theme. GitHub Actions builds the site with
Jekyll **4.4.1** from `Gemfile.lock`, then deploys the generated `_site` artifact.
The repository's Pages source must be **GitHub Actions**. The custom domain stays
`www.aivi.fyi`; do not change DNS, `CNAME`, article permalinks or dates.

## Validate locally

Use Ruby 3.4.1, Bundler 2.6.2 and Node.js with the built-in test runner:

```sh
bundle install
bundle exec ruby test/read_time_test.rb
node --test test/search_ranking_test.cjs
bundle exec ruby test/performance_test.rb
JEKYLL_ENV=production bundle exec jekyll build
bundle exec ruby test/seo_test.rb
```

`SITE_DEST` can point the metadata test at a different build directory. The build
logs the Jekyll version and fails if it is not 4.4.1. Sass may report existing
`@import` deprecations; changing the vendored theme is a separate maintenance task.
Ruby is pinned because 3.4.12 changes Unicode handling in generated IDs for two
existing emoji headings. The historical anchor tests must pass before changing
the Ruby version; keep those links stable without rewriting article bodies.

## Compatibility and permissions

The old `github-pages` bundle fixed Jekyll at 3.10.0. Its hosted build ignored
unsupported dependency requests, so a Gemfile edit alone did not upgrade the
deployed runtime. Direct dependencies now retain the relevant Pages plugins.
The former hosted build did **not** load `jekyll-archives`; it remains disabled to
preserve the current category/tag index URLs and avoid generating extra archives.

The build job has only `contents: read`. Only the deployment job gets
`pages: write` and `id-token: write`, in the existing `github-pages` environment.
No personal access token or extra repository secret is needed. Actions are pinned
to reviewed release commit SHAs, and checkout does not persist credentials.

## Recovery

The known-good pre-migration commit is
`9c4d30856d10d909d47cd49ebb27f71e0080d357` (Pages run `40074583298`).
Use a normal revert commit to undo this migration if needed; never force-reset
main or overwrite newer article commits. Restoring the old hosted builder also
requires an administrator to change Pages Source back to **Deploy from a branch**,
branch `main`, directory `/`. Keep the custom domain and HTTPS setting unchanged.

## SEO scope

The site emits one connected JSON-LD graph for the website, its visible author,
article pages and author profile. Article dates are sourced from post front matter,
not embedded-video publication dates. Video schema requires separately verified
video metadata. Article images should depict the article's actual content; an
author avatar is not a fallback article illustration.

Canonical, sitemap and description tests verify technical output. They do not
measure Google indexing, search position, traffic, or real-user Core Web Vitals.
No special AI-search file or `llms.txt` is required for these fixes.

## Theme performance

`_plugins/latent_performance.rb` fingerprints the compiled theme CSS and its three
JavaScript files after rendering. Their URLs change only when their actual bytes
change, including imported Sass changes. A new article alone does not invalidate
these resource URLs. GitHub Pages still controls the HTTP cache lifetime.

The content renderer adds native `loading="lazy"` to YouTube embeds without an
explicit loading preference. Existing eager/lazy choices, non-video embeds and
the source articles are preserved. Browsers load videos when they approach the
viewport; this is not a click-to-play facade or a change to the video contents.
