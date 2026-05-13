import { test, expect } from '@playwright/test';

test('TR case studies index renders', async ({ page }) => {
  await page.goto('/tr/calismalarimiz');
  await expect(page.getByRole('heading', { level: 1, name: 'Çalışmalarımız' })).toBeVisible();
});

test('TR case study detail renders', async ({ page }) => {
  const res = await page.goto('/tr/calismalarimiz/fortuneris');
  expect(res?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Fortuneris');
});

test('Unknown case study slug 404s', async ({ page }) => {
  const res = await page.goto('/tr/calismalarimiz/yok-boyle-bir-vaka', { waitUntil: 'commit' });
  expect(res?.status()).toBe(404);
});
