import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { await page.goto('/'); });

async function press(page, ...keys) {
  for (const key of keys) await page.getByRole('button', { name: key, exact: true }).click();
}

test('Addition test: 3 + 9 = 12', async ({ page }) => {
  await press(page, '3', '+', '9', '=');
  await expect(page.getByLabel('Result')).toHaveText('12');
});

test('Subtraction test: 9 - 3 = 6', async ({ page }) => {
  await press(page, '9', '−', '3', '=');
  await expect(page.getByLabel('Result')).toHaveText('6');
});

test('Multiplication test: 3 x 9 = 27', async ({ page }) => {
  await press(page, '3', '×', '9', '=');
  await expect(page.getByLabel('Result')).toHaveText('27');
});

test('Division test: 9 / 3 = 3', async ({ page }) => {
  await press(page, '9', '÷', '3', '=');
  await expect(page.getByLabel('Result')).toHaveText('3');
});

test('Clear test: enter 39, press AC, expect 0', async ({ page }) => {
  await press(page, '3', '9', 'AC');
  await expect(page.getByLabel('Result')).toHaveText('0');
});
