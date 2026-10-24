/*!
 * Holographic computing core, projected into SVG. The legacy filename and
 * component hook are retained for the vendored Latent theme.
 * compute() also supplies the no-script / reduced-motion still in the include.
 */
(function (root) {
  "use strict";
  if (!root || root.LatentFractalSpace) return;

  var NS = "http://www.w3.org/2000/svg";
  var CFG = { still: 0, lite: 400, frameInterval: 1000 / 30 };
  var doc = root.document;
  function q(n) { return Math.round(n * 10) / 10; }

  function compute(t) {
    var az = .62 + .2 * Math.sin(t * Math.PI * 2 / 38);
    var el = .38 + .045 * Math.sin(t * Math.PI * 2 / 29);
    var ca = Math.cos(az), sa = Math.sin(az), ce = Math.cos(el), se = Math.sin(el);
    var lift = 3 * Math.sin(t * Math.PI * 2 / 9);
    function project(p) {
      var x = ca * p[0] + sa * p[2], z = -sa * p[0] + ca * p[2];
      return [q(240 + x * 108), q(236 - (p[1] * ce - z * se) * 108 + lift)];
    }
    function path(points, close) {
      return points.map(function (p, i) { return (i ? "L" : "M") + project(p).join(" "); }).join("") + (close ? "Z" : "");
    }
    function plane(y, size) { return [[-size, y, -size], [size, y, -size], [size, y, size], [-size, y, size]]; }
    function cube(size) { return plane(-size, size).concat(plane(size, size)); }
    var items = [];
    function add(tag, cls, attrs) {
      items.push({ tag: tag, cls: cls.split(" ").map(function (name) { return "lt-fs__" + name; }).join(" "), attrs: attrs });
    }
    var corners = cube(1);
    var edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    function wire(vertices, list) {
      return list.map(function (edge) { return path([vertices[edge[0]], vertices[edge[1]]]); }).join("");
    }
    // Just two transparent skins; the interior remains visible.
    add("path", "skin", { d: path([corners[4], corners[5], corners[6], corners[7]], true) });
    add("path", "skin", { d: path([corners[0], corners[1], corners[5], corners[4]], true) });
    add("path", "wire wire--back", { d: wire(corners, edges) });

    var levels = [-.57, 0, .57].map(function (y, i) {
      return y + .035 * Math.sin(t * Math.PI * 2 / 8 + i * 1.3);
    });
    levels.forEach(function (y, i) {
      add("path", i === 1 ? "slice slice--middle" : "slice", { d: path(plane(y, .82), true) });
      var grid = "";
      [-.27, .27].forEach(function (v) {
        grid += path([[-.82, y, v], [.82, y, v]]) + path([[v, y, -.82], [v, y, .82]]);
      });
      add("path", "grid", { d: grid });
      add("path", "trace", { d: path([[-.65, y, .6], [-.65, y, .12], [-.32, y, .12]]) + path([[.65, y, -.6], [.65, y, -.12], [.32, y, -.12]]) });
    });

    // One local scan every 16 seconds, with a quiet interval between passes.
    var phase = t % 16, scan = Math.min(1, phase / 4);
    var scanY = -.7 + 1.4 * scan;
    var scanOpacity = phase < 4 ? .65 * Math.pow(Math.sin(Math.PI * scan), 2) : 0;
    add("path", "scan", { d: path(plane(scanY, .79), true), opacity: scanOpacity.toFixed(3) });

    var route = [[-.5, levels[0], -.3], [.25, levels[0], -.3], [.25, levels[1], -.3], [.25, levels[1], .4], [-.4, levels[1], .4], [-.4, levels[2], .4], [-.4, levels[2], -.4], [.45, levels[2], -.4]];
    var routePath = path(route);
    add("path", "route", { d: routePath });
    add("path", "core", { d: wire(cube(.16), edges) });
    // The near lower-left corner provides the bright silhouette.
    add("path", "wire", { d: wire(corners, [[0,1],[3,0],[0,4],[4,5],[7,4],[1,5],[3,7],[5,6],[6,7]]) });
    [0, 2, 4, 7].forEach(function (index, i) {
      var p = project(route[index]);
      add("circle", "node-halo", { cx: p[0], cy: p[1], r: 6, opacity: (.35 + .12 * Math.sin(t * .8 - i)).toFixed(3) });
      add("circle", "node", { cx: p[0], cy: p[1], r: 2.6 });
    });
    var pulse = { d: routePath, pathLength: 100, "stroke-dashoffset": q(10 - (t % 7) / 7 * 120), opacity: .85 };
    add("path", "glow", pulse);
    add("path", "beam", pulse);
    return items;
  }

  function set(node, key, value) {
    if (node.getAttribute(key) !== String(value)) node.setAttribute(key, value);
  }
  function Instance(host) {
    this.host = host;
    this.layer = host.querySelector("[data-fs-cube]");
    this.nodes = Array.prototype.slice.call(this.layer.children);
    this.clock = CFG.still;
    this.visible = true;
    this.running = false;
    this.paused = false;
    this.raf = 0;
    this.tick = this.tick.bind(this);
  }
  Instance.prototype.paint = function (t) {
    var items = compute(t), layer = this.layer;
    // Reuse the server-rendered geometry, including its exact resting pose.
    if (this.nodes.length !== items.length) {
      while (layer.firstChild) layer.removeChild(layer.firstChild);
      this.nodes = items.map(function (item) {
        var node = doc.createElementNS(NS, item.tag);
        node.setAttribute("class", item.cls);
        layer.appendChild(node);
        return node;
      });
    }
    this.nodes.forEach(function (node, i) {
      var attrs = items[i].attrs;
      for (var key in attrs) set(node, key, attrs[key]);
    });
  };
  Instance.prototype.tick = function (now) {
    this.raf = 0;
    if (!this.running) return;
    this.clock += this.last ? Math.min(.1, (now - this.last) / 1000) : 0;
    this.last = now;
    // Retain mobile throttling; only small panels are limited to ~30 paints/s.
    if (this.host.clientWidth >= CFG.lite || now - this.lastPaint >= CFG.frameInterval - 1) {
      this.lastPaint = now;
      this.paint(this.clock);
    }
    this.raf = root.requestAnimationFrame(this.tick);
  };
  Instance.prototype.start = function () {
    if (this.running || this.paused || REDUCE.matches || !this.visible || doc.hidden) return;
    this.running = true;
    this.last = 0;
    this.lastPaint = 0;
    this.raf = root.requestAnimationFrame(this.tick);
  };
  Instance.prototype.stop = function () {
    this.running = false;
    if (this.raf) root.cancelAnimationFrame(this.raf);
    this.raf = 0;
  };
  Instance.prototype.settle = function () {
    this.stop();
    this.clock = CFG.still;
    this.paint(CFG.still);
  };

  root.LatentFractalSpace = { config: CFG, compute: compute };
  if (!doc || !root.requestAnimationFrame) return;
  var REDUCE = root.matchMedia ? root.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var instances = [];
  function init() {
    Array.prototype.forEach.call(doc.querySelectorAll("[data-fractal-space]"), function (host) {
      if (host.__ltFractal || !host.querySelector("[data-fs-cube]")) return;
      var inst = host.__ltFractal = new Instance(host);
      instances.push(inst);
      var toggle = host.querySelector("[data-fs-toggle]");
      if (toggle) {
        toggle.hidden = false;
        toggle.addEventListener("click", function () {
          inst.paused = !inst.paused;
          toggle.textContent = inst.paused ? "播放" : "暂停";
          toggle.setAttribute("aria-label", inst.paused ? "播放全息核心动画" : "暂停全息核心动画");
          toggle.setAttribute("aria-pressed", String(inst.paused));
          if (inst.paused) inst.stop(); else inst.start();
        });
      }
      if ("IntersectionObserver" in root) {
        var box = host.getBoundingClientRect();
        inst.visible = box.bottom > -120 && box.top < (root.innerHeight || doc.documentElement.clientHeight) + 120;
        new root.IntersectionObserver(function (entries) {
          inst.visible = entries[entries.length - 1].isIntersecting;
          if (inst.visible) inst.start(); else inst.stop();
        }, { rootMargin: "120px" }).observe(host);
      }
      inst.start();
    });
  }
  doc.addEventListener("visibilitychange", function () {
    instances.forEach(function (inst) { if (doc.hidden) inst.stop(); else inst.start(); });
  });
  function onReduce() {
    instances.forEach(function (inst) { if (REDUCE.matches) inst.settle(); else inst.start(); });
  }
  if (REDUCE.addEventListener) REDUCE.addEventListener("change", onReduce);
  else if (REDUCE.addListener) REDUCE.addListener(onReduce);
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})(typeof window !== "undefined" ? window : this);
