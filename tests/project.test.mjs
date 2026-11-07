import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('project uses clashjichang.world identity', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  const layout = await read('src/layouts/BaseLayout.astro');
  const astroConfig = await read('astro.config.mjs');
  const robots = await read('public/robots.txt');

  assert.equal(packageJson.name, 'clashjichang-world');
  assert.match(layout, /<html lang="zh-CN" dir="ltr">/);
  assert.match(layout, /clashjichang\.world/);
  assert.match(astroConfig, /https:\/\/clashjichang\.world/);
  assert.match(robots, /https:\/\/clashjichang\.world\/sitemap-index\.xml/);
});

test('42 brands data integrity check', async () => {
  const raw = await read('src/data/brands.json');
  const brands = JSON.parse(raw);

  assert.equal(brands.length, 42, 'Must contain exactly 42 brands');

  // Verify rank 1 is Guangsu Cloud (Featured)
  assert.equal(brands[0].name, '光速云');
  assert.equal(brands[0].rank, 1);
  assert.equal(brands[0].isFeatured, true);
  assert.equal(brands[0].couponCode, 'AMM');

  // Verify all brands have unique slugs
  const slugs = new Set();
  for (const b of brands) {
    assert.ok(b.slug, `Brand ${b.name} must have a slug`);
    assert.ok(!slugs.has(b.slug), `Duplicate slug found: ${b.slug}`);
    slugs.add(b.slug);
    assert.ok(b.name, 'Brand must have a name');
    assert.ok(b.priceStr, `Brand ${b.name} must have a price string`);
  }

  // Verify tested brands have valid image path
  const tested = brands.filter((b) => b.hasSpeedtest && b.speedtestImg);
  assert.ok(tested.length >= 16, 'At least 16 brands should have real speedtest images');
});

test('clients data integrity check', async () => {
  const raw = await read('src/data/clients.json');
  const categories = JSON.parse(raw);

  assert.equal(categories.length, 4, 'Must have Windows, Android, iOS, macOS categories');
  for (const cat of categories) {
    assert.ok(cat.items.length >= 3, `${cat.category} must have at least 3 clients`);
  }
});
