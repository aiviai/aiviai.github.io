/* Shared by the search palette and Node regression tests. No DOM dependencies. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.LatentSearch = factory();
}(typeof window !== "undefined" ? window : this, function () {
  "use strict";

  function normalize(value) {
    return String(value || "").normalize("NFKC").toLowerCase()
      .replace(/[-‐‑–—]/g, " ").replace(/([a-z])(?=\d)/g, "$1 ")
      .replace(/\s+/g, " ").trim();
  }

  function escapeRegex(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // Version boundaries matter: 5.5 must not match 5.50, 15.5 or 5.5.1.
  // Han text remains substring-searchable; Latin words get word boundaries.
  function contains(text, term, partial) {
    if (!term) return true;
    if (partial && !/\d/.test(term)) return text.indexOf(term) >= 0;
    var left = /^[a-z0-9]/.test(term) ? "(^|[^a-z0-9.])" : "";
    var right = /[a-z0-9]$/.test(term) ? "(?=$|[^a-z0-9.])" : "";
    return new RegExp(left + escapeRegex(term) + right).test(text);
  }

  function all(text, terms, partial) {
    return terms.every(function (term) { return contains(text, term, partial); });
  }

  function score(post, query, terms) {
    var title = normalize(post.t), tags = normalize((post.g || []).join(" "));
    if (contains(title, query)) return 100;
    if (all(title, terms)) return 90;
    if (contains(tags, query) || all(tags, terms)) return 80;
    if (all(title, terms, true)) return 70;
    if (all(tags, terms, true)) return 60;
    if (all(normalize(post.s), terms, true)) return 40;
    if (all(normalize(post.x), terms, true)) return 20;
    return 0;
  }

  function snippet(post, query, terms, rank) {
    if (rank > 20 || !query) return post.s || "";
    var body = String(post.x || "");
    // Find the position in the original text, preserving offsets for display.
    var lower = body.toLowerCase(), at = lower.indexOf(query);
    if (at < 0) {
      at = terms.reduce(function (first, term) {
        var next = lower.indexOf(term);
        return next >= 0 && (first < 0 || next < first) ? next : first;
      }, -1);
    }
    if (at < 0) return post.s || body.slice(0, 220);
    var start = Math.max(0, at - 24), end = Math.min(body.length, Math.max(start + 220, at + query.length));
    return (start ? "…" : "") + body.slice(start, end) + (end < body.length ? "…" : "");
  }

  function rank(posts, input) {
    var query = normalize(input), terms = query.split(" ");
    return posts.map(function (post, order) {
      var value = query ? score(post, query, terms) : 1;
      return { post: post, score: value, order: order, snippet: snippet(post, query, terms, value) };
    }).filter(function (hit) { return hit.score > 0; })
      .sort(function (a, b) { return b.score - a.score || a.order - b.order; });
  }

  return { rank: rank, normalize: normalize };
}));
