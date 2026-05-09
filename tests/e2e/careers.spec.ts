import { test, expect } from '@playwright/test';

test('TR careers index renders with team culture', async ({ page }) => {
  await page.goto('/tr/kariyer');
  await expect(page.getByRole('heading', { level: 1, name: 'Kariyer' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ekip kültürümüz' })).toBeVisible();
});

test('TR job detail renders with all sections', async ({ page }) => {
  await page.goto('/tr/kariyer/senior-backend-engineer-jvm');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Senior Backend');
  await expect(page.getByRole('heading', { name: 'Sorumluluklar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Aranan nitelikler' })).toBeVisible();
});

test('Unknown job slug 404s', async ({ page }) => {
  const res = await page.goto('/tr/kariyer/no-such-role', { waitUntil: 'commit' });
  expect(res?.status()).toBe(404);
});
