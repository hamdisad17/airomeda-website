import { test, expect } from '@playwright/test';

test('TR home renders 7 service cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Hizmetlerimiz' })).toBeVisible();
  const cards = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Hizmetlerimiz' }) })
    .getByRole('link');
  await expect(cards).toHaveCount(7);
});

test('EN home renders 7 service cards', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { name: 'Our services' })).toBeVisible();
});

test('Home shows hero CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Demo Talep Et' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Çalışmalarımız' }).first()).toBeVisible();
});
