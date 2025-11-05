import { test, expect } from '@playwright/test';

test('La página de login carga correctamente', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveTitle(/ERP Los Esmeraldes/i);
});

test('El formulario de login está visible', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('form')).toBeVisible();
});

test('Los campos de usuario y contraseña existen', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('input[name="email"]').or(page.locator('input[type="email"]'))).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
});

test('El botón de login existe', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});
