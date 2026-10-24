/*!
 * Fractal Space: an endless walk into a Menger sponge, drawn in SVG.
 * Part of the Latent theme; markup in _includes/fractal-space.html.
 *
 * The sponge lives in a frame where its near corner V is the origin and the
 * cube fills [0,1]^3 away from the camera. Over one cycle the camera closes in
 * on the corner subcube [0,1/3]^3, scaling with its target so that at the end
 * the subcube frames exactly as the whole cube did; the frame then rescales by
 * three and the walk continues.
 *
 * First the whole cube grows past the edges of the panel, so we are looking
 * into its corner; then the rest of the cube dissolves and leaves the corner
 * subcube floating on its own, which we approach until it frames like the
 * whole cube did. Its finest openings are closed at the start of a cycle and
 * open as it grows, so the last picture of a cycle equals the first.
 */
(function (root) {
  "use strict";
  if (!root || root.LatentFractalSpace) return;

  var NS = "http://www.w3.org/2000/svg";
  var TAU = Math.PI * 2;

  var CFG = {
    level: 2,            // recursion shown on the whole cube; the corner carries one more
    cycle: 30,           // seconds per step into the corner subcube (a x3 zoom)
    start: 2.5,          // seconds into the loop on first paint: whole cube, highlight mid-pass
    still: 2.5,          // the same pose, held for reduced motion and without scripts
    distance: 3.4,       // camera distance from V, in cube edges
    span: 0.68,          // share of the panel the cube spans
    azimuth: 0.70, azimuthSwing: 0.07, azimuthPeriod: 19,
    elevation: 0.47, elevationSwing: 0.035, elevationPeriod: 27,
    pulse: 5,            // seconds per highlight pass; six passes per cycle
    fog: 0.36,           // relative depth at which interior faces reach the panel tone
    fogLite: 0.26,       // the same on small screens: fewer faces to draw
    cullDark: true,      // skip faces that have sunk fully into the panel tone
    lite: 400            // panels narrower than this (CSS px) use the lighter settings
  };

  // Face tones by axis: 0 = left face, 1 = top, 2 = right face. The near
  // faces ramp from BASE at V to HULL_END; interior walls start darker and
  // sink toward the panel tone with depth.
  var BASE = [[52, 58, 63], [80, 87, 92], [31, 35, 39]];
  var HULL_END = [[34, 38, 42], [54, 59, 63], [21, 24, 27]];
  var INTERIOR = 0.78;
  var FOG = [13, 15, 16];
  var STEPS = 24;

  var PALETTE = BASE.map(function (c) {
    var row = [];
    for (var i = 0; i < STEPS; i++) {
      var f = Math.pow(i / (STEPS - 1), 0.8);
      row.push(rgb(c.map(function (v, j) { v *= INTERIOR; return Math.round(v + (FOG[j] - v) * f); })));
    }
    return row;
  });
  var HULL_STOPS = BASE.map(function (c, i) { return [rgb(c), rgb(HULL_END[i])]; });

  function rgb(c) { return "rgb(" + c.join(",") + ")"; }
  function smooth(a, b, x) {
    x = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return x * x * (3 - 2 * x);
  }
  function ease(x) { return x < 0.5 ? 2 * x * x : 1 - 2 * (1 - x) * (1 - x); }
  function q(v) { return Math.round(v * 10) / 10; }

  /* -------------------------------------------------------------- geometry */

  // A cell of a 3^n grid survives iff no ternary digit position holds a 1 in
  // two or more coordinates: the Menger rule applied at every scale at once.
  function kept(x, y, z) {
    while (x || y || z) {
      if ((x % 3 === 1) + (y % 3 === 1) + (z % 3 === 1) > 1) return false;
      x = (x - x % 3) / 3; y = (y - y % 3) / 3; z = (z - z % 3) / 3;
    }
    return true;
  }
  function kept2(a, b) {
    while (a || b) {
      if (a % 3 === 1 && b % 3 === 1) return false;
      a = (a - a % 3) / 3; b = (b - b % 3) / 3;
    }
    return true;
  }

  // Point on the plane u_d = p, with coordinates a and b on the other axes.
  function pt(d, p, a, b) {
    var v = [0, 0, 0];
    v[d] = p; v[(d + 1) % 3] = a; v[(d + 2) % 3] = b;
    return v;
  }

  // Built once, in the focus frame; every cycle reuses it.
  //   set 0  outer cube: the cube at `level`, minus the corner subcube
  //   set 1  corner subcube, one level finer
  //   set 2  filler: the corner's finest openings, closed until they open
  // Faces are squares {set, d, v: four corners, c: centre}, already in
  // painter's order: farther cells (larger index sum) first. With the camera
  // beyond V on all three axes, that order is exact.
  function buildScene(level) {
    var n = Math.pow(3, level), k = n / 3, faces = [];

    function inGrid(c) { return c[0] >= 0 && c[1] >= 0 && c[2] >= 0 && c[0] < n && c[1] < n && c[2] < n; }
    function isOuter(c) { return inGrid(c) && kept(c[0], c[1], c[2]) && !(c[0] < k && c[1] < k && c[2] < k); }
    function isCorner(c) { return inGrid(c) && kept(c[0], c[1], c[2]); }
    function isFiller(c) {
      return inGrid(c) && !kept(c[0], c[1], c[2]) &&
        kept((c[0] - c[0] % 3) / 3, (c[1] - c[1] % 3) / 3, (c[2] - c[2] % 3) / 3);
    }
    function cells(test) {
      var out = [];
      for (var x = 0; x < n; x++) for (var y = 0; y < n; y++) for (var z = 0; z < n; z++) {
        if (test([x, y, z])) out.push([x, y, z]);
      }
      return out.sort(function (a, b) { return (b[0] + b[1] + b[2]) - (a[0] + a[1] + a[2]); });
    }
    // Only faces turned toward the camera, and only where no solid neighbour
    // covers them. Faces on the cube's own near faces are drawn as merged
    // paths instead (the hull, below).
    function add(set, c, size, solid) {
      for (var d = 0; d < 3; d++) {
        if (c[d] === 0) continue;
        var nb = c.slice(); nb[d] -= 1;
        if (solid(nb)) continue;
        var a = c[(d + 1) % 3] * size, b = c[(d + 2) % 3] * size, p = c[d] * size, h = size / 2;
        var v = [].concat(pt(d, p, a, b), pt(d, p, a + size, b), pt(d, p, a + size, b + size), pt(d, p, a, b + size));
        faces.push({ set: set, d: d, v: new Float64Array(v), c: pt(d, p, a + h, b + h) });
      }
    }
    cells(isOuter).forEach(function (c) { add(0, c, 1 / n, isOuter); });
    var fillerSolid = function (nb) { return isCorner(nb) || isFiller(nb); };
    cells(function (c) { return isCorner(c) || isFiller(c); }).forEach(function (c) {
      if (isCorner(c)) add(1, c, 1 / (3 * n), isCorner);
      else add(2, c, 1 / (3 * n), fillerSolid);
    });

    // Openings on the near faces, as [a, b, size, level] in face coordinates.
    var holes = { outer: [], corner: [], fine: [] };
    for (var l = 1; l <= level + 1; l++) {
      var g = Math.pow(3, l - 1), h = 1 / (3 * g);
      for (var i = 0; i < g; i++) for (var j = 0; j < g; j++) {
        if (!kept2(i, j)) continue;
        var inCorner = l >= 2 && i < g / 3 && j < g / 3;
        if (!inCorner && l > level) continue;
        (inCorner ? (l === level + 1 ? holes.fine : holes.corner) : holes.outer).push([(3 * i + 1) * h, (3 * j + 1) * h, h, l]);
      }
    }
    return { faces: faces, holes: holes };
  }

  /* ---------------------------------------------------------------- camera */

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function unit(a) { var l = Math.sqrt(dot(a, a)); return [a[0] / l, a[1] / l, a[2] / l]; }

  // The camera orbits V gently and closes in along a ray through V. Camera
  // and target scale together, so the view of the corner subcube at the end
  // of a cycle is exactly the view of the whole cube at its start.
  function camera(t, swing) {
    var c = CFG.cycle, tau = (((t % c) + c) % c) / c, s = Math.pow(3, -tau);
    var az = CFG.azimuth + (swing ? CFG.azimuthSwing * Math.sin(TAU * t / CFG.azimuthPeriod) : 0);
    var el = CFG.elevation + (swing ? CFG.elevationSwing * Math.sin(TAU * t / CFG.elevationPeriod + 1.3) : 0);
    var ce = Math.cos(el), r = CFG.distance * s;
    var cam = [-ce * Math.sin(az) * r, -Math.sin(el) * r, -ce * Math.cos(az) * r];
    var f = unit(sub([0.5 * s, 0.5 * s, 0.5 * s], cam));
    var rt = unit(cross(f, [0, -1, 0]));
    return { tau: tau, s: s, cam: cam, f: f, r: rt, u: cross(rt, f), dv: r };
  }

  // Fit the cube to the panel once, from the resting pose.
  function frameView() {
    var cv = camera(0, false), minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (var i = 0; i < 8; i++) {
      var p = sub([i & 1, (i >> 1) & 1, (i >> 2) & 1], cv.cam), z = dot(p, cv.f);
      var x = dot(p, cv.r) / z, y = -dot(p, cv.u) / z;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    var F = 480 * CFG.span / Math.max(maxX - minX, maxY - minY);
    return { F: F, ox: 240 - F * (minX + maxX) / 2, oy: 242 - F * (minY + maxY) / 2 };
  }

  /* ----------------------------------------------------------------- frame */

  // Everything one picture needs, as strings; shared by the live renderer and
  // the generator of the static frame in the include.
  function compute(scene, view, t, opts) {
    var cv = camera(t, true), tau = cv.tau;
    var cam = cv.cam, f = cv.f, r = cv.r, u = cv.u, F = view.F, ox = view.ox, oy = view.oy;
    var t3 = 1 / 3;

    function proj(x, y, z) {
      x -= cam[0]; y -= cam[1]; z -= cam[2];
      var dz = x * f[0] + y * f[1] + z * f[2];
      return [ox + F * (x * r[0] + y * r[1] + z * r[2]) / dz, oy - F * (x * u[0] + y * u[1] + z * u[2]) / dz];
    }
    function P(v) { return proj(v[0], v[1], v[2]); }
    function path(pts, close) {
      var s = "";
      for (var j = 0; j < pts.length; j++) { var p = P(pts[j]); s += (j ? "L" : "M") + q(p[0]) + " " + q(p[1]); }
      return close ? s + "Z" : s;
    }
    function rect(d, a0, b0, a1, b1) {
      return path([pt(d, 0, a0, b0), pt(d, 0, a1, b0), pt(d, 0, a1, b1), pt(d, 0, a0, b1)], true);
    }
    function squares(d, list) {
      var s = "";
      for (var j = 0; j < list.length; j++) s += rect(d, list[j][0], list[j][1], list[j][0] + list[j][2], list[j][1] + list[j][2]);
      return s;
    }

    // The rest of the cube dissolves only once it has grown past the panel;
    // the corner's finest openings open while it grows into the frame.
    var fadeC = 1 - smooth(0.5, 0.88, tau);
    var fadeF = 1 - smooth(0.42, 0.95, tau);
    var fogSpan = opts.lite ? CFG.fogLite : CFG.fog;

    // Interior faces, shaded by depth relative to V; skipped when dark, gone
    // or outside the panel.
    var faces = scene.faces, out = opts.faces || new Array(faces.length);
    var c0 = cam[0], c1 = cam[1], c2 = cam[2], kf = (STEPS - 1) / fogSpan, xs = [0, 0, 0, 0], ys = [0, 0, 0, 0];
    for (var n = 0; n < faces.length; n++) {
      var fc = faces[n], o = out[n] || (out[n] = {});
      o.hide = (fc.set === 0 && fadeC < 0.004) || (fc.set === 2 && fadeF < 0.004);
      if (o.hide) continue;
      var c = fc.c, ex = c[0] - c0, ey = c[1] - c1, ez = c[2] - c2;
      var rho = Math.sqrt(ex * ex + ey * ey + ez * ez) / cv.dv - 1;   // depth relative to V: scale-free
      var lvl = Math.min(STEPS - 1, Math.max(0, Math.round((rho - 0.02) * kf)));
      if (lvl === STEPS - 1 && CFG.cullDark) { o.hide = true; continue; }   // fully in the dark
      var v = fc.v, left = 0, right = 0, top = 0, bottom = 0;
      for (var m = 0; m < 4; m++) {
        var x = v[3 * m] - c0, y = v[3 * m + 1] - c1, z = v[3 * m + 2] - c2;
        var dz = x * f[0] + y * f[1] + z * f[2];
        var sx = xs[m] = ox + F * (x * r[0] + y * r[1] + z * r[2]) / dz;
        var sy = ys[m] = oy - F * (x * u[0] + y * u[1] + z * u[2]) / dz;
        left += sx < 0; right += sx > 480; top += sy < 0; bottom += sy > 480;
      }
      if (left === 4 || right === 4 || top === 4 || bottom === 4) { o.hide = true; continue; }   // off the panel
      o.pts = q(xs[0]) + "," + q(ys[0]) + " " + q(xs[1]) + "," + q(ys[1]) + " " +
              q(xs[2]) + "," + q(ys[2]) + " " + q(xs[3]) + "," + q(ys[3]);
      o.col = PALETTE[fc.d][lvl];
    }

    // The near faces: outer part, corner part, and the patches that close the
    // corner's finest openings.
    var H = scene.holes, dz = 0.0015;
    var hull = [0, 1, 2].map(function (dd) {
      return {
        // The outer part tucks a hair under the corner part so no seam shows.
        outer: path([pt(dd, 0, t3 - dz, 0), pt(dd, 0, 1, 0), pt(dd, 0, 1, 1), pt(dd, 0, 0, 1), pt(dd, 0, 0, t3 - dz), pt(dd, 0, t3 - dz, t3 - dz)], true) + squares(dd, H.outer),
        corner: rect(dd, 0, 0, t3, t3) + squares(dd, H.corner) + squares(dd, H.fine),
        fine: squares(dd, H.fine)
      };
    });

    // Each near face darkens away from V; the ramp scales with the camera, so
    // it reads the same before and after the frame rescales.
    var V = proj(0, 0, 0);
    var grads = [0, 1, 2].map(function (dd) {
      var e = P(pt(dd, 0, 0.95 * cv.s, 0.95 * cv.s));
      return [q(V[0]), q(V[1]), q(e[0]), q(e[1])];
    });

    // Edges lie on the near faces only, so nothing ever passes in front.
    var edges = { outA: "", outC: "", outI: "", rimA: "", rimC: "", rimF: "" };
    for (var dd = 0; dd < 3; dd++) {
      var a1 = [0, 0, 0], a3 = [0, 0, 0]; a1[dd] = 1; a3[dd] = t3;
      edges.outA += path([[0, 0, 0], a3]);
      edges.outC += path([a3, a1]) + path([pt(dd, 0, 1, 0), pt(dd, 0, 1, 1), pt(dd, 0, 0, 1)]);
      edges.outI += path([pt(dd, 0, t3, 0), pt(dd, 0, t3, t3), pt(dd, 0, 0, t3)]);
      edges.rimA += squares(dd, H.corner);
      edges.rimC += squares(dd, H.outer);
      edges.rimF += squares(dd, H.fine);
    }
    // The corner subcube's outline: a faint guide while we head for it, then
    // its true silhouette as the rest of the cube dissolves.
    var outline = Math.max(0.3 * smooth(0.12, 0.5, tau), 1 - fadeC);

    // The highlight: one lime pass at a time around an opening. Early passes
    // circle the large openings, later ones the corner we are heading into.
    // Passes are dark at the cycle boundary, so the rescale never shows.
    var pulse = null;
    var big = H.outer.filter(function (hh) { return hh[3] === 1; })[0];
    var small = H.corner.filter(function (hh) { return hh[3] === 2; })[0];
    function loop(dd, hh) { return rect(dd, hh[0], hh[1], hh[0] + hh[2], hh[1] + hh[2]); }
    var tc = tau * CFG.cycle, kq = Math.floor(tc / CFG.pulse), tw = tc - kq * CFG.pulse;
    var pr = Math.min(1, Math.max(0, (tw - 0.25) / (CFG.pulse - 0.5)));
    var env = Math.pow(Math.sin(Math.PI * pr), 1.2);
    if (env > 0.01) pulse = { d: kq < 2 ? loop(kq, big) : loop(kq % 3, small), off: -(100 * ease(pr) + 17 * kq), a: env };

    return { faces: out, hull: hull, grads: grads, edges: edges, outline: outline, fadeC: fadeC, fadeF: fadeF, pulse: pulse };
  }

  /* -------------------------------------------------------------- renderer */

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function set(e, name, value) {
    if (e["_" + name] !== value) { e["_" + name] = value; e.setAttribute(name, value); }
  }
  function show(e, on) {
    if (e._shown === on) return;
    e._shown = on;
    if (on) e.removeAttribute("display"); else e.setAttribute("display", "none");
  }

  function Instance(host) {
    this.host = host;
    this.id = host.getAttribute("data-fractal-space") || "lt-fs";
    this.layer = host.querySelector("[data-fs-cube]");
    this.clock = CFG.start;
    this.running = false;
    this.visible = true;
    this.built = false;
    this.tick = this.tick.bind(this);
  }

  // Replace the still frame from the include with live elements.
  Instance.prototype.build = function () {
    var layer = this.layer, id = this.id, scene = SCENE(), self = this;
    this.opts = { faces: [], lite: false };
    while (layer.firstChild) layer.removeChild(layer.firstChild);

    var outer = el("g", { "class": "lt-fs__outer" }, layer);
    var corner = el("g", { "class": "lt-fs__corner" }, layer);
    this.fillers = [];
    this.polys = scene.faces.map(function (fc) {
      var p = el("polygon", { "class": "lt-fs__face" }, fc.set === 0 ? outer : corner);
      if (fc.set === 2) self.fillers.push(p);
      return p;
    });
    this.grads = [];
    this.hull = [0, 1, 2].map(function (d) {
      var g = document.getElementById(id + "-g" + d);
      self.grads.push(g);
      if (g) {
        var stops = g.getElementsByTagName("stop");
        for (var s = 0; s < stops.length && s < 2; s++) stops[s].setAttribute("stop-color", HULL_STOPS[d][s]);
      }
      return { outer: el("path", { "class": "lt-fs__hull", fill: "url(#" + id + "-g" + d + ")" }, outer) };
    });
    this.hull.forEach(function (h, d) {
      h.fine = el("path", { "class": "lt-fs__hull lt-fs__fill", fill: "url(#" + id + "-g" + d + ")", stroke: "url(#" + id + "-g" + d + ")" }, layer);
    });
    this.hull.forEach(function (h, d) {
      h.corner = el("path", { "class": "lt-fs__hull", fill: "url(#" + id + "-g" + d + ")" }, layer);
    });
    var edges = el("g", { "class": "lt-fs__edges" }, layer);
    this.edges = {};
    ["outA", "outC", "outI", "rimA", "rimC", "rimF"].forEach(function (key) {
      self.edges[key] = el("path", { "class": "lt-fs__edge lt-fs__edge--" + key }, edges);
    });
    this.outer = outer;
    this.glow = el("path", { "class": "lt-fs__glow", pathLength: 100 }, layer);
    this.beam = el("path", { "class": "lt-fs__beam", pathLength: 100 }, layer);
    this.built = true;
  };

  Instance.prototype.paint = function (t) {
    if (!this.built) this.build();
    var o = this.opts;
    o.lite = this.host.clientWidth < CFG.lite;
    var fr = compute(SCENE(), VIEW(), t, o);
    o.faces = fr.faces;

    var polys = this.polys;
    for (var i = 0; i < polys.length; i++) {
      var p = polys[i], st = fr.faces[i];
      show(p, !st.hide);
      if (st.hide) continue;
      set(p, "points", st.pts);
      set(p, "color", st.col);
    }
    var fo = fr.fadeF.toFixed(3);
    for (var j = 0; j < this.fillers.length; j++) set(this.fillers[j], "opacity", fo);
    var outerOn = fr.fadeC >= 0.004;   // the rest of the cube, until it has dissolved
    for (var d = 0; d < 3; d++) {
      var h = this.hull[d], hd = fr.hull[d], g = this.grads[d], gv = fr.grads[d];
      if (outerOn) set(h.outer, "d", hd.outer);
      set(h.corner, "d", hd.corner);
      set(h.fine, "d", hd.fine);
      set(h.fine, "opacity", fo);
      if (g) { set(g, "x1", gv[0]); set(g, "y1", gv[1]); set(g, "x2", gv[2]); set(g, "y2", gv[3]); }
    }
    var fc = fr.fadeC.toFixed(3), E = this.edges;
    show(this.outer, outerOn);
    show(E.outC, outerOn);
    show(E.rimC, outerOn);
    set(this.outer, "opacity", fc);
    for (var key in E) if (outerOn || (key !== "outC" && key !== "rimC")) set(E[key], "d", fr.edges[key]);
    set(E.outC, "opacity", fc);
    set(E.rimC, "opacity", fc);
    set(E.outI, "opacity", fr.outline.toFixed(3));
    set(E.rimF, "opacity", (1 - fr.fadeF).toFixed(3));

    var pl = fr.pulse;
    [this.glow, this.beam].forEach(function (b) {
      show(b, !!pl);
      if (!pl) return;
      set(b, "d", pl.d);
      set(b, "stroke-dashoffset", pl.off.toFixed(2));
      set(b, "opacity", pl.a.toFixed(3));
    });
  };

  Instance.prototype.tick = function (now) {
    this.raf = 0;
    if (!this.running) return;
    var dt = this.last ? Math.min(0.1, (now - this.last) / 1000) : 0;
    this.last = now;
    this.clock += dt;
    // Small screens repaint at about 30 fps; the motion is slow enough.
    if (this.host.clientWidth >= CFG.lite || now - (this.lastPaint || 0) > 30) {
      this.lastPaint = now;
      this.paint(this.clock);
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  Instance.prototype.start = function () {
    if (this.running || REDUCE.matches || !this.visible || doc.hidden) return;
    this.running = true;
    this.last = 0;
    if (!this.raf) this.raf = requestAnimationFrame(this.tick);
  };
  Instance.prototype.stop = function () {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  };
  // Reduced motion: hold the composed still frame. Before the script has
  // drawn anything, the identical frame from the include is on screen.
  Instance.prototype.settle = function () {
    this.stop();
    this.clock = CFG.still;               // resume from here if motion is allowed again
    if (this.built) this.paint(CFG.still);
  };

  /* ------------------------------------------------------------- bootstrap */

  var doc = root.document;
  var scene = null, view = null;
  function SCENE() { return scene || (scene = buildScene(CFG.level)); }
  function VIEW() { return view || (view = frameView()); }

  root.LatentFractalSpace = {
    config: CFG,
    buildScene: buildScene,
    frameView: frameView,
    compute: compute,
    hullStops: HULL_STOPS
  };

  if (!doc || !root.requestAnimationFrame) return;

  var REDUCE = root.matchMedia ? root.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var instances = [];

  function init() {
    Array.prototype.forEach.call(doc.querySelectorAll("[data-fractal-space]"), function (host) {
      if (host.__ltFractal) return;            // one loop per component, however often the script runs
      var inst = host.__ltFractal = new Instance(host);
      instances.push(inst);
      if ("IntersectionObserver" in root) {
        // Start at once if the panel is already on screen; the observer then
        // pauses and resumes it as it scrolls out of and into view.
        var box = host.getBoundingClientRect();
        inst.visible = box.bottom > -120 && box.top < (root.innerHeight || doc.documentElement.clientHeight) + 120;
        inst.start();
        new IntersectionObserver(function (entries) {
          inst.visible = entries[entries.length - 1].isIntersecting;
          if (inst.visible) inst.start(); else inst.stop();
        }, { rootMargin: "120px" }).observe(host);
      } else {
        inst.start();
      }
    });
  }

  doc.addEventListener("visibilitychange", function () {
    instances.forEach(function (inst) { if (doc.hidden) inst.stop(); else inst.start(); });
  });
  var onReduce = function () {
    instances.forEach(function (inst) { if (REDUCE.matches) inst.settle(); else inst.start(); });
  };
  if (REDUCE.addEventListener) REDUCE.addEventListener("change", onReduce);
  else if (REDUCE.addListener) REDUCE.addListener(onReduce);

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})(typeof window !== "undefined" ? window : this);
