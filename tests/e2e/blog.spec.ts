import { test, expect } from '@playwright/test';

test('TR blog index renders', async ({ page }) => {
  await page.goto('/tr/blog');
  await expect(page.getByRole('heading', { level: 1, name: 'Yazılar' })).toBeVisible();
});

test('TR blog post detail renders', async ({ page }) => {
  const res = await page.goto('/tr/blog/core-banking-modernizasyon-stratejisi');
  expect(res?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('Blog category filter renders posts', async ({ page }) => {
  await page.goto('/tr/blog/kategori/finans');
  await expect(page.getByRole('heading', { level: 1, name: 'finans' })).toBeVisible();
});

test('Unknown blog post slug 404s', async ({ page }) => {
  const res = await page.goto('/tr/blog/no-such-post', { waitUntil: 'commit' });
  expect(res?.status()).toBe(404);
});
