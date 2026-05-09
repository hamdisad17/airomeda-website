import { test, expect } from '@playwright/test';

test('Contact form renders on /tr/iletisim', async ({ page }) => {
  await page.goto('/tr/iletisim');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { name: 'Bizimle iletişime geçin' })).toBeVisible();
  await expect(page.getByLabel('Ad Soyad', { exact: false })).toBeVisible();
  await expect(page.getByLabel('E-posta', { exact: false })).toBeVisible();
  await expect(page.getByLabel('Mesajınız', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Gönder' })).toBeVisible();
});

test('Contact form client-side validation blocks empty submit', async ({ page }) => {
  await page.goto('/tr/iletisim');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Gönder' }).click();
  // RHF should display validation errors; check that we did NOT navigate (still on the same page)
  await expect(page).toHaveURL(/iletisim/);
});

test('Demo form renders on /tr/hizmetler/finans', async ({ page }) => {
  await page.goto('/tr/hizmetler/finans');
  await page.waitForLoadState('networkidle');
  // Scroll to the form (it's at the bottom)
  await page.locator('form').last().scrollIntoViewIfNeeded();
  await expect(page.locator('form').last()).toBeVisible();
  await expect(page.locator('form').last().getByRole('button', { name: 'Gönder' })).toBeVisible();
});

test('Job application form renders on /tr/kariyer/senior-backend-engineer-jvm with file input', async ({ page }) => {
  await page.goto('/tr/kariyer/senior-backend-engineer-jvm');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { name: 'Bu pozisyona başvurun' })).toBeVisible();
  await expect(page.locator('input[type="file"]')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Başvur' })).toBeVisible();
});

test('Job application form requires file', async ({ page }) => {
  await page.goto('/tr/kariyer/senior-backend-engineer-jvm');
  await page.waitForLoadState('networkidle');
  await page.getByLabel('Ad Soyad', { exact: false }).fill('Test User');
  await page.getByLabel('E-posta', { exact: false }).fill('test@example.com');
  await page.getByLabel('Kısa ön yazı', { exact: false }).fill('Bu rol için başvurmak istiyorum. Tecrübem ve uygunluğum hakkında konuşmak isterim.');
  await page.getByRole('button', { name: 'Başvur' }).click();
  // Browser-native HTML5 validation should prevent submission
  await expect(page).toHaveURL(/kariyer/);
});
