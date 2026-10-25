const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/fractal-space.js'), 'utf8');

function scene() {
  const pending = new Map();
  let id = 0;
  const media = { matches: false, addEventListener() {} };
  const layer = { children: [] };
  const host = {
    clientWidth: 600,
    querySelector: s => s === '[data-fs-cube]' ? layer : null,
    getBoundingClientRect: () => ({ top: 0, bottom: 480 })
  };
  const document = { readyState: 'complete', hidden: false, querySelectorAll: () => [host], addEventListener() {} };
  const root = {
    document, matchMedia: () => media,
    requestAnimationFrame: callback => { pending.set(++id, callback); return id; },
    cancelAnimationFrame: id => pending.delete(id)
  };
  root.window = root;
  vm.runInNewContext(source, root);
  const instance = host.__ltFractal;
  const paints = [];
  instance.paint = time => paints.push(time);
  const frame = time => {
    const callbacks = [...pending.values()];
    pending.clear();
    callbacks.forEach(callback => callback(time));
  };
  return { frame, instance, paints, document, media, pending };
}

for (const hz of [60, 120, 144]) {
  test(`slow hero stays within 30 paints/s on a ${hz} Hz desktop`, () => {
    const s = scene();
    for (let i = 0; i <= hz * 2; i++) s.frame(100 + i * 1000 / hz);
    assert.ok(s.paints.length >= 48 && s.paints.length <= 62, `unexpected paint count: ${s.paints.length}`);
    assert.ok(Math.abs(s.instance.clock - 2) < .02, 'motion speed must remain two seconds over two seconds');
  });
}

test('paused, offscreen, hidden and reduced-motion scenes do not schedule drawing', () => {
  const s = scene();
  for (const [object, key, value] of [
    [s.instance, 'paused', true], [s.instance, 'visible', false],
    [s.document, 'hidden', true], [s.media, 'matches', true]
  ]) {
    s.instance.stop();
    const previous = object[key];
    object[key] = value;
    s.instance.start();
    assert.equal(s.pending.size, 0);
    object[key] = previous;
  }
  s.instance.start();
  assert.equal(s.pending.size, 1, 'animation resumes without user interaction');
});
