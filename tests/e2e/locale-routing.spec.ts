import { test, expect } from '@playwright/test';

test('TR is default locale: / redirects to /tr', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/tr$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Karmaşık');
});

test('EN locale at /en', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('complex');
});

test('Unknown locale 404s', async ({ page }) => {
  const response = await page.goto('/de', { waitUntil: 'commit' });
  expect(response?.status()).toBe(404);
});
