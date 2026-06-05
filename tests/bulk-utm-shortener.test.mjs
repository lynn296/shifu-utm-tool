import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('batch UTM shortener section exposes the expected controls', () => {
  for (const id of [
    'batchUrlList',
    'batchStartBtn',
    'batchCopyAllBtn',
    'batchClearBtn',
    'batchTableWrap',
  ]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /批次縮短 UTM 網址/);
  assert.match(html, /每行一筆完整 UTM URL/);
  assert.doesNotMatch(html, /id="batchApiToken"/);
});

test('batch Lihi client reuses the embedded HTML API key and form encoded requests', () => {
  assert.match(html, /const LIHI_API_KEY = '[^']+'/);
  assert.match(html, /Authorization': `x-api-key:\$\{LIHI_API_KEY\}`/);
  assert.doesNotMatch(html, /localStorage\.getItem\('lihi_token'\)/);
  assert.match(html, /new URLSearchParams\(body\)\.toString\(\)/);
  assert.match(html, /longUrl: item\.original/);
});
