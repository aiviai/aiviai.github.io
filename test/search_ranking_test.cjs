// Run with: node --test test/search_ranking_test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const { rank } = require('../assets/js/search-ranking.js');
const posts = [
  { t: 'Fable 5.5 动画实测', s: '对比 Opus 5.5', x: 'Opus 5.5 的另一项任务', g: ['Fable5.5'] },
  { t: 'Sonnet 5.5 评测', x: '参考 Opus 5.5 的结果' },
  { t: 'Claude Opus 5.5 实测', s: '音乐播放器与住宅交互', x: '可进入双层住宅', g: ['Opus5.5'] },
  { t: '其他文章', x: '会话分支与编程工具', g: ['Claude', 'Opus5.5'] }
];
test('exact title phrase beats newer summary and body mentions', () => {
  assert.equal(rank(posts, 'Opus 5.5')[0].post, posts[2]);
  assert.equal(rank(posts, 'Opus 5.5')[1].post, posts[3]);
});
test('model names tolerate case, compact spacing and hyphens', () => {
  for (const q of ['OPUS 5.5', 'Opus5.5', 'Ｏｐｕｓ　５．５']) assert.equal(rank(posts, q)[0].post, posts[2]);
  assert.equal(rank([{t:'DeepSeek-V4.1-Flash-1017 实测'}], 'DeepSeek V4.1 Flash 1017').length, 1);
});
test('versions are complete tokens, not numeric prefixes', () => {
  assert.equal(rank([{t:'Opus 5.50'}, {t:'Opus 15.5'}, {t:'Opus 5.5.1'}], 'Opus 5.5').length, 0);
});
test('all title tokens beat tags, which beat partial title and body', () => {
  const results = rank([{t:'Opus', x:'Claude Opus 5.5'}, {t:'Guide', g:['Opus5.5']}, {t:'5.5：Opus 测试'}], 'Opus 5.5');
  assert.deepEqual(results.map(r => r.score), [90, 80, 20]);
});
test('Chinese and English partial queries remain useful', () => {
  assert.equal(rank(posts, '会话分支')[0].post, posts[3]);
  assert.equal(rank(posts, '音乐播放器')[0].post, posts[2]);
  assert.equal(rank([{t:'Programming tools'}], 'program')[0].score, 70);
});
test('empty query and equal scores preserve original newest-first order', () => {
  assert.deepEqual(rank(posts, '  ').map(r => r.post), posts);
  assert.deepEqual(rank(posts, '5.5').slice(0, 3).map(r => r.post), posts.slice(0, 3));
});
test('no matches, literal regex characters and missing fields are safe', () => {
  assert.equal(rank(posts, '不存在的模型').length, 0);
  assert.equal(rank([{}, {t:'C++ tutorial'}], 'C++').length, 1);
  assert.doesNotThrow(() => rank([{}], '[] (.*)'));
});
test('body hits retain contextual snippets', () => {
  const post = {t:'note', x:'开头'.repeat(100) + '会话分支' + '结尾'.repeat(150)};
  const hit = rank([post], '会话分支')[0];
  assert.ok(hit.snippet.includes('会话分支'));
  assert.ok(hit.snippet.startsWith('…'));
  assert.ok(hit.snippet.endsWith('…'));
});
