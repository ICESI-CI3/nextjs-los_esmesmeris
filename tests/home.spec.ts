import { test, expect } from '@playwright/test';

test('La página principal carga y muestra el título', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ERP Los Esmeraldes/i);
});

test('La página principal carga correctamente', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});
