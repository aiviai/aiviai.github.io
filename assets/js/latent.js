/*!
 * Latent theme script: color theme, search palette, menu, reading progress,
 * sidenotes, code blocks, copy buttons and archive filters.
 * Every feature is progressive: pages read fine without it.
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var THEME_KEY = "latent-theme";

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, type, fn, opts) { if (el) el.addEventListener(type, fn, opts || false); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------------------------------------------------------- theme */

  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function storedPref() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function currentPref() {
    var p = storedPref();
    if (p === "light" || p === "dark" || p === "system") return p;
    return root.getAttribute("data-theme-default") || "system";
  }

  function resolve(pref) {
    if (pref === "system") return darkQuery && darkQuery.matches ? "dark" : "light";
    return pref;
  }

  function applyTheme(pref, save) {
    if (save) {
      try { localStorage.setItem(THEME_KEY, pref); } catch (e) {}
    }
    var theme = resolve(pref);
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-theme-pref", pref);
    $$("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-label", theme === "dark" ? "切换到浅色主题" : "切换到深色主题");
    });
    $$("[data-theme-set]").forEach(function (b) {
      var active = b.getAttribute("data-theme-set") === pref;
      b.classList.toggle("on", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  applyTheme(currentPref(), false);

  on(doc, "click", function (e) {
    var toggle = e.target.closest("[data-theme-toggle]");
    if (toggle) {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
      return;
    }
    var set = e.target.closest("[data-theme-set]");
    if (set) applyTheme(set.getAttribute("data-theme-set"), true);
  });

  if (darkQuery) {
    var onScheme = function () { if (currentPref() === "system") applyTheme("system", false); };
    if (darkQuery.addEventListener) darkQuery.addEventListener("change", onScheme);
    else if (darkQuery.addListener) darkQuery.addListener(onScheme);
  }

  // Another tab changed the theme.
  on(window, "storage", function (e) { if (e.key === THEME_KEY) applyTheme(currentPref(), false); });

  /* ---------------------------------------------------- keyboard labels */

  var isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  if (!isMac) $$("[data-kbd-mod]").forEach(function (k) { k.textContent = "Ctrl K"; });

  /* ----------------------------------------------------------- overlays */

  var openOverlay = null;
  var lastFocus = null;

  function showOverlay(el, focusEl) {
    if (openOverlay && openOverlay !== el) hideOverlay(openOverlay, false);
    lastFocus = doc.activeElement;
    el.hidden = false;
    root.classList.add("lt-lock");
    openOverlay = el;
    if (focusEl) focusEl.focus();
  }

  function hideOverlay(el, restore) {
    el.hidden = true;
    root.classList.remove("lt-lock");
    if (openOverlay === el) openOverlay = null;
    if (restore !== false && lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Keep Tab inside an open dialog.
  on(doc, "keydown", function (e) {
    if (!openOverlay || e.key !== "Tab") return;
    var items = $$("a[href], button:not([disabled]), input, [tabindex]:not([tabindex='-1'])", openOverlay)
      .filter(function (n) { return n.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ------------------------------------------------------- mobile menu */

  var menu = $("[data-menu]");
  var menuButtons = $$("[data-menu-open]");

  function setMenu(open) {
    if (!menu) return;
    menuButtons.forEach(function (b) { b.setAttribute("aria-expanded", open ? "true" : "false"); });
    if (open) showOverlay(menu, $("[data-menu-close]", menu));
    else hideOverlay(menu);
  }

  menuButtons.forEach(function (b) { on(b, "click", function () { setMenu(true); }); });
  if (menu) {
    on($("[data-menu-close]", menu), "click", function () { setMenu(false); });
    on(menu, "click", function (e) { if (e.target.closest("a[href]")) setMenu(false); });
    on(window, "resize", function () { if (!menu.hidden && window.innerWidth > 900) setMenu(false); });
  }

  /* ----------------------------------------------------- search palette */

  var palette = $("[data-search]");
  var search = palette ? initSearch(palette) : null;

  on(doc, "click", function (e) {
    var trigger = e.target.closest("[data-search-open]");
    if (trigger && search) {
      e.preventDefault();
      search.open();
    }
  });

  on(doc, "keydown", function (e) {
    if (e.isComposing || e.keyCode === 229) return;
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      if (!search) return;
      e.preventDefault();
      if (palette.hidden) search.open(); else search.close();
    } else if (e.key === "/" && !typing && search && palette.hidden) {
      e.preventDefault();
      search.open();
    } else if (e.key === "Escape") {
      if (palette && !palette.hidden) search.close();
      else if (menu && !menu.hidden) setMenu(false);
    }
  });

  function initSearch(el) {
    var input = $("[data-search-input]", el);
    var results = $("[data-search-results]", el);
    var count = $("[data-search-count]", el);
    var scopes = $$("[data-scope]", el);
    var scope = "all";
    var active = 0;
    var flat = [];
    var index = null;
    var loading = null;

    function load() {
      if (index || loading) return loading;
      results.innerHTML = '<div class="lt-palette__empty" role="status">正在加载搜索…</div>';
      count.textContent = "";
      flat = [];
      input.removeAttribute("aria-activedescendant");
      loading = fetch(el.getAttribute("data-index"))
        .then(function (r) {
          if (!r.ok) throw new Error("Search index unavailable");
          return r.json();
        })
        .then(function (data) {
          index = { posts: data.posts || [], sections: [], tags: data.tags || [] };
          index.posts.forEach(function (p) {
            (p.h || []).forEach(function (h, i) {
              index.sections.push({
                t: h.t,
                u: p.u + "#" + h.id,
                m: "in " + p.t + " · §" + (i < 9 ? "0" : "") + (i + 1)
              });
            });
          });
          loading = null;
          render();
        })
        .catch(function () {
          loading = null;
          results.innerHTML = '<div class="lt-palette__empty"><strong>暂时无法搜索</strong><span>搜索索引加载失败，请重试。</span><button class="lt-btn lt-btn-secondary lt-btn-sm" type="button" data-search-retry>重新加载</button></div>';
        });
      return loading;
    }

    function norm(s) { return String(s || "").toLowerCase().replace(/-/g, " "); }

    function mark(text, q) {
      text = String(text || "");
      if (!q) return esc(text);
      var i = norm(text).indexOf(q);
      if (i < 0) return esc(text);
      return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
    }

    function matches(q, a, b) { return !q || norm(a).indexOf(q) >= 0 || (b && norm(b).indexOf(q) >= 0); }

    var icons = {
      post: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20Z"></path><path d="M10 12h5M10 16h5"></path></svg>',
      tag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3-8.7 8.7Z"></path><circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none"></circle></svg>'
    };
    var ret = '<span class="lt-ret lt-kbd" aria-hidden="true">↵</span>';

    function render() {
      if (!index) return;
      var q = norm(input.value.trim());
      var want = function (g) { return scope === "all" || scope === g; };
      var posts = [];
      if (want("posts")) {
        posts = window.LatentSearch.rank(index.posts, input.value).map(function (hit) {
          var p = hit.post;
          return { t: p.t, s: hit.snippet, m: p.m, u: p.u };
        });
        posts = posts.slice(0, q ? 6 : 3);
      }
      var secs = want("sections") ? index.sections.filter(function (s) { return matches(q, s.t); }).slice(0, q ? 4 : 2) : [];
      var tags = want("tags") ? index.tags.filter(function (t) { return matches(q, t.t); }).slice(0, q ? 4 : 2) : [];
      var html = "";
      flat = [];

      function item(u, cls, inner) {
        var i = flat.length;
        flat.push(u);
        return '<a class="lt-res' + (cls ? " " + cls : "") + '" href="' + esc(u) + '" data-i="' + i + '" id="lt-res-' + i + '" role="option">' + inner + "</a>";
      }

      if (posts.length) {
        html += '<div class="lt-label">' + (q ? "文章" : "最近文章") + "</div>";
        posts.forEach(function (p) {
          html += item(p.u, "", '<span class="lt-ico">' + icons.post + '</span><span class="lt-res__body"><span class="lt-res__title">' + mark(p.t, q) + "</span>" +
            (p.s ? '<span class="lt-res__snippet">' + mark(p.s, q) + "</span>" : "") +
            '<span class="lt-meta lt-res__meta">' + esc(p.m) + "</span></span>" + ret);
        });
      }
      if (secs.length) {
        html += '<div class="lt-label">章节</div>';
        secs.forEach(function (s) {
          html += item(s.u, "is-compact", '<span class="lt-ico">#</span><span class="lt-res__body" style="gap: 2px"><span class="lt-res__title" style="font-size: 15px">' + mark(s.t, q) + '</span><span class="lt-res__sub">' + esc(s.m) + "</span></span>" + ret);
        });
      }
      if (tags.length) {
        html += '<div class="lt-label">标签</div>';
        tags.forEach(function (t) {
          html += item(t.u, "is-compact", '<span class="lt-ico">' + icons.tag + '</span><span class="lt-res__tag">#' + mark(t.t, q) + '</span><span class="lt-res__count">' + t.n + (t.n === 1 ? " 篇" : " 篇") + "</span>" + ret);
        });
      }
      if (!flat.length) {
        html = '<div class="lt-palette__empty"><strong>没有找到“' + esc(input.value.trim()) + '”</strong><span>请缩短关键词，或按标签浏览文章。</span></div>';
      }
      results.innerHTML = html;
      count.textContent = flat.length + (flat.length === 1 ? " 个结果" : " 个结果");
      setActive(0);
    }

    function setActive(i) {
      var rows = $$(".lt-res", results);
      if (!rows.length) { input.removeAttribute("aria-activedescendant"); return; }
      active = Math.max(0, Math.min(rows.length - 1, i));
      rows.forEach(function (r, n) {
        r.classList.toggle("on", n === active);
        r.setAttribute("aria-selected", n === active ? "true" : "false");
      });
      input.setAttribute("aria-activedescendant", rows[active].id);
      var row = rows[active];
      var top = row.offsetTop, bottom = top + row.offsetHeight;
      if (top < results.scrollTop) results.scrollTop = top - 8;
      else if (bottom > results.scrollTop + results.clientHeight) results.scrollTop = bottom - results.clientHeight + 8;
    }

    on(input, "input", render);
    on(input, "keydown", function (e) {
      if (e.isComposing || e.keyCode === 229) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter" && flat[active]) { e.preventDefault(); window.location.href = flat[active]; }
    });
    on(results, "mousemove", function (e) {
      var row = e.target.closest(".lt-res");
      if (row) { var i = +row.getAttribute("data-i"); if (i !== active) setActive(i); }
    });
    on(results, "click", function (e) {
      if (e.target.closest("[data-search-retry]")) {
        input.focus();
        load();
        return;
      }
      var row = e.target.closest(".lt-res");
      if (row) close(false);
    });
    scopes.forEach(function (b) {
      on(b, "click", function () {
        scope = b.getAttribute("data-scope");
        scopes.forEach(function (s) {
          var isOn = s === b;
          s.classList.toggle("on", isOn);
          s.setAttribute("aria-pressed", isOn ? "true" : "false");
        });
        render();
        input.focus();
      });
    });
    $$("[data-search-close]", el).forEach(function (b) { on(b, "click", function () { close(); }); });

    function open() {
      if (menu && !menu.hidden) setMenu(false);
      showOverlay(el, input);
      input.select();
      load();
      render();
    }

    function close(restore) { hideOverlay(el, restore); }

    return { open: open, close: close };
  }

  /* ---------------------------------------------------------- prose */

  var LANGS = {
    js: "JavaScript", javascript: "JavaScript", ts: "TypeScript", typescript: "TypeScript", py: "Python", python: "Python",
    rb: "Ruby", ruby: "Ruby", sh: "Shell", bash: "Shell", shell: "Shell", console: "Console", zsh: "Shell",
    yml: "YAML", yaml: "YAML", json: "JSON", html: "HTML", css: "CSS", scss: "SCSS", go: "Go", rust: "Rust", rs: "Rust",
    c: "C", cpp: "C++", java: "Java", kotlin: "Kotlin", swift: "Swift", sql: "SQL", toml: "TOML", md: "Markdown",
    markdown: "Markdown", liquid: "Liquid", diff: "Diff", r: "R", julia: "Julia", tex: "TeX", latex: "LaTeX"
  };

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }

  function legacyCopy(text) {
    return new Promise(function (resolveCopy, reject) {
      var ta = doc.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      doc.body.appendChild(ta);
      ta.select();
      try { doc.execCommand("copy") ? resolveCopy() : reject(); } catch (err) { reject(err); }
      doc.body.removeChild(ta);
    });
  }

  function flash(btn) {
    btn.classList.add("is-copied");
    clearTimeout(btn._ltTimer);
    btn._ltTimer = setTimeout(function () { btn.classList.remove("is-copied"); }, 1600);
  }

  on(doc, "click", function (e) {
    var btn = e.target.closest("[data-copy-text], [data-copy-target]");
    if (!btn) return;
    var text = btn.getAttribute("data-copy-text");
    if (text == null) {
      var target = $(btn.getAttribute("data-copy-target"));
      text = target ? (target.getAttribute("data-copy-source") || target.innerText) : "";
    }
    copyText(text).then(function () { flash(btn); }, function () {});
  });

  // Fenced code: a header with file name, language and a copy button, plus line numbers.
  var lineNumbers = !doc.body.hasAttribute("data-no-line-numbers");

  function numberLines(code) {
    var lines = code.innerHTML.replace(/\n$/, "").split("\n");
    var open = [];
    code.innerHTML = lines.map(function (line) {
      var prefix = open.join("");
      var tags = line.match(/<\/?span[^>]*>/g) || [];
      tags.forEach(function (t) { if (t.charAt(1) === "/") open.pop(); else open.push(t); });
      return '<span class="l">' + prefix + line + new Array(open.length + 1).join("</span>") + "</span>";
    }).join("\n");
  }

  $$("[data-prose] div.highlighter-rouge, [data-prose] figure.highlight").forEach(function (block, n) {
    var code = $("pre code", block) || $("pre", block);
    if (!code) return;
    var cls = (block.className + " " + (code.className || "")).match(/language-([\w+#-]+)/);
    var lang = (cls && cls[1]) || code.getAttribute("data-lang") || "";
    var file = block.getAttribute("data-file") || block.getAttribute("title") || "";
    var label = LANGS[lang.toLowerCase()] || (lang && lang !== "plaintext" && lang !== "text" ? lang.charAt(0).toUpperCase() + lang.slice(1) : "");
    var source = code.textContent.replace(/\n$/, "");
    var id = "lt-code-" + n;
    code.setAttribute("id", id);
    code.setAttribute("data-copy-source", source);

    var head = doc.createElement("div");
    head.className = "lt-code-h";
    head.innerHTML = (file ? '<span class="file">' + esc(file) + "</span>" : "") +
      (file && label ? '<span aria-hidden="true">·</span>' : "") +
      (label ? "<span>" + esc(label) + "</span>" : "") +
      '<button class="lt-copy" type="button" data-copy-target="#' + id + '"><span class="lt-when-idle">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"></rect><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"></path></svg>Copy</span>' +
      '<span class="lt-when-copied"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"></path></svg>Copied</span></button>';
    block.insertBefore(head, block.firstChild);

    if (lineNumbers && code.tagName === "CODE" && source.indexOf("\n") >= 0) {
      numberLines(code);
      block.classList.add("lt-code--ln");
    }
  });

  // Heading anchors.
  $$("[data-prose][data-anchors] h2[id]").forEach(function (h) {
    var a = doc.createElement("a");
    a.className = "lt-anchor";
    a.href = "#" + h.id;
    a.setAttribute("aria-label", "Link to this section");
    a.textContent = "#";
    h.appendChild(a);
  });

  // Tables scroll sideways on small screens instead of overflowing.
  $$("[data-prose] table").forEach(function (t) {
    if (t.parentNode.classList.contains("lt-table-wrap")) return;
    var wrap = doc.createElement("div");
    wrap.className = "lt-table-wrap";
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);
  });

  // Footnotes become sidenotes beside the paragraph that cites them.
  $$("[data-prose][data-sidenotes]").forEach(function (prose) {
    var list = $(".footnotes", prose);
    if (!list) return;
    $$("a.footnote, sup[role='doc-noteref'] > a", prose).forEach(function (ref) {
      var id = decodeURIComponent((ref.getAttribute("href") || "").slice(1));
      var note = id && doc.getElementById(id);
      if (!note) return;
      var block = ref.closest("p, li, blockquote, td") || ref.parentNode;
      while (block.parentNode && block.parentNode !== prose && !block.parentNode.classList.contains("lt-sn")) {
        if (block.parentNode.matches("li, blockquote")) block = block.parentNode; else break;
      }
      var holder = block.parentNode && block.parentNode.classList.contains("lt-sn") ? block.parentNode : null;
      if (!holder) {
        holder = doc.createElement("div");
        holder.className = "lt-sn";
        block.parentNode.insertBefore(holder, block);
        holder.appendChild(block);
      }
      var body = note.cloneNode(true);
      $$(".reversefootnote", body).forEach(function (b) { b.parentNode.removeChild(b); });
      var side = doc.createElement("aside");
      side.className = "lt-side";
      side.innerHTML = '<span class="lt-fn" aria-hidden="true">' + esc(ref.textContent.trim()) + "</span>" + body.innerHTML.trim();
      side.setAttribute("aria-label", "Note " + ref.textContent.trim());
      holder.appendChild(side);
    });
  });

  // Math, when the page loaded KaTeX.
  if ($("[data-math]")) {
    on(window, "load", function () {
      if (!window.renderMathInElement) return;
      $$("[data-math]").forEach(function (el) {
        window.renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false }
          ],
          throwOnError: false
        });
      });
    });
  }

  /* ------------------------------------------------- reading progress */

  var article = $("[data-article]");
  if (article) {
    var bars = $$("[data-progress]");
    var label = $("[data-progress-label]");
    var minutes = parseInt(article.getAttribute("data-minutes"), 10) || 1;
    var tocLinks = $$("[data-toc-link]");
    var targets = tocLinks.map(function (a) { return doc.getElementById(decodeURIComponent(a.hash.slice(1))); });
    var ticking = false;

    var update = function () {
      ticking = false;
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 100;
      bars.forEach(function (b) { b.style.width = p.toFixed(1) + "%"; });
      if (label) {
        var left = Math.max(1, Math.round(minutes * (1 - p / 100)));
        label.textContent = Math.round(p) + "% · 约剩 " + left + " 分钟";
      }
      var current = 0;
      var scrollPadding = parseFloat(window.getComputedStyle(root).scrollPaddingTop) || 0;
      targets.forEach(function (t, i) {
        if (!t) return;
        var scrollMargin = parseFloat(window.getComputedStyle(t).scrollMarginTop) || 0;
        if (t.getBoundingClientRect().top <= scrollPadding + scrollMargin + 2) current = i;
      });
      var currentTarget = targets[current];
      tocLinks.forEach(function (a, i) {
        a.classList.toggle("on", !!currentTarget && targets[i] === currentTarget);
      });
    };

    on(window, "scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    on(window, "resize", update);
    update();
  }

  /* ---------------------------------------------------------- archive */

  var archive = $("[data-archive]");
  if (archive) initArchive(archive);

  function initArchive(el) {
    var entries = $$("[data-entry]", el);
    var years = $$("[data-year]", el);
    var tabs = $$("[data-filter-section]", el);
    var query = $("[data-filter-query]", el);
    var tagChip = $("[data-filter-tag-clear]", el);
    var tagName = $("[data-filter-tag-name]", el);
    var summary = $("[data-filter-summary]", el);
    var empty = $("[data-filter-empty]", el);
    var tagLinks = $$("[data-filter-tag]", el);
    var navLinks = $$(".lt-nav a, .lt-mnav a");
    var params = new URLSearchParams(window.location.search);
    var state = {
      section: (params.get("section") || "").toLowerCase(),
      tag: params.get("tag") || "",
      q: params.get("q") || ""
    };
    var titleOf = {};
    tabs.forEach(function (t) { titleOf[t.getAttribute("data-filter-section")] = t.firstChild.textContent.trim(); });
    if (query) query.value = state.q;

    function sync() {
      var p = new URLSearchParams();
      if (state.section) p.set("section", state.section);
      if (state.tag) p.set("tag", state.tag);
      if (state.q.trim()) p.set("q", state.q.trim());
      var qs = p.toString();
      history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : "") + window.location.hash);
    }

    function apply() {
      var q = state.q.trim().toLowerCase();
      var shown = 0;
      entries.forEach(function (e) {
        var tags = JSON.parse(e.getAttribute("data-tags") || "[]");
        var categories = JSON.parse(e.getAttribute("data-categories") || "[]").map(function (s) { return s.toLowerCase(); });
        var ok = (!state.section || categories.indexOf(state.section) >= 0) &&
          (!state.tag || tags.indexOf(state.tag) >= 0) &&
          (!q || (e.getAttribute("data-title") || "").indexOf(q) >= 0);
        e.hidden = !ok;
        if (ok) shown++;
      });
      years.forEach(function (y) {
        var n = $$("[data-entry]", y).filter(function (e) { return !e.hidden; }).length;
        y.hidden = n === 0;
        var c = $("[data-year-count]", y);
        if (c) c.textContent = n + (n === 1 ? " 篇" : " 篇");
      });
      tabs.forEach(function (t) {
        var isOn = t.getAttribute("data-filter-section") === state.section;
        t.classList.toggle("on", isOn);
        t.setAttribute("aria-pressed", isOn ? "true" : "false");
      });
      tagLinks.forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-filter-tag") === state.tag); });
      if (tagChip) { tagChip.hidden = !state.tag; tagName.textContent = state.tag; }
      // Point the primary nav at the section being browsed.
      navLinks.forEach(function (a) {
        var sec = a.getAttribute("data-nav-section");
        var isArchive = !sec && a.pathname === window.location.pathname;
        var current = sec ? sec === state.section : isArchive && !state.section;
        if (current) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      });
      var text = "显示 " + shown + " / " + entries.length + " 篇文章";
      if (state.section) text += " · 分类：" + (titleOf[state.section] || state.section);
      if (state.tag) text += " · 标签 #" + state.tag;
      if (q) text += " · 关键词 “" + state.q.trim() + "”";
      summary.textContent = text;
      empty.hidden = shown > 0;
    }

    tabs.forEach(function (t) {
      on(t, "click", function () { state.section = t.getAttribute("data-filter-section"); apply(); sync(); });
    });
    tagLinks.forEach(function (a) {
      on(a, "click", function (e) {
        e.preventDefault();
        var t = a.getAttribute("data-filter-tag");
        state.tag = state.tag === t ? "" : t;
        apply();
        sync();
        try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (err) { window.scrollTo(0, 0); }
      });
    });
    on(tagChip, "click", function () { state.tag = ""; apply(); sync(); });
    on(query, "input", function () { state.q = query.value; apply(); sync(); });
    on($("[data-filter-reset]", el), "click", function () {
      state = { section: "", tag: "", q: "" };
      if (query) query.value = "";
      apply();
      sync();
    });
    apply();
  }

  /* ------------------------------------------------------- newsletter */

  $$("form[data-newsletter]").forEach(function (form) {
    var ok = $("[data-newsletter-ok]", form);
    var unset = $("[data-newsletter-unset]", form);
    var fields = $$("input, button[type='submit']", form);
    on(form, "submit", function (e) {
      if (!form.getAttribute("action")) {
        e.preventDefault();
        unset.hidden = false;
        return;
      }
      if (!window.fetch || !window.FormData) return;
      e.preventDefault();
      fetch(form.action, { method: "POST", body: new FormData(form), mode: "no-cors" })
        .then(function () {
          fields.forEach(function (f) { f.hidden = true; });
          unset.hidden = true;
          ok.hidden = false;
        })
        .catch(function () { form.submit(); });
    });
  });
})();
