import { test, expect } from '@playwright/test';

const TR_SLUGS = [
  'finans',
  'sans-oyunlari',
  'e-ticaret',
  'entegrasyon',
  'seo-reklam',
  'sosyal-medya',
  'crm',
];

test.describe('TR service pages', () => {
  for (const slug of TR_SLUGS) {
    test(`renders /hizmetler/${slug}`, async ({ page }) => {
      const res = await page.goto(`/hizmetler/${slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Yetkinliklerimiz' })).toBeVisible();
    });
  }
});

test('EN service page (/en/services/finance) renders', async ({ page }) => {
  await page.goto('/en/services/finance');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Financial Software');
});

test('Unknown service slug 404s', async ({ page }) => {
  const res = await page.goto('/hizmetler/yok-boyle-bir-hizmet', { waitUntil: 'commit' });
  expect(res?.status()).toBe(404);
});
