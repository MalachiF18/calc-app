import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { await page.goto('/'); });

async function press(page, ...keys) {
  for (const key of keys) await page.getByRole('button', { name: key, exact: true }).click();
}

test('adds two numbers', async ({ page }) => {
  await press(page, '1', '2', '+', '7', '=');
  await expect(page.getByLabel('Result')).toHaveText('19');
});

test('subtracts to produce a negative result', async ({ page }) => {
  await press(page, '3', '−', '8', '=');
  await expect(page.getByLabel('Result')).toHaveText('-5');
});

test('multiplies decimals using the keyboard', async ({ page }) => {
  await page.keyboard.type('1.5*4');
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Result')).toHaveText('6');
});

test('divides numbers and handles division by zero', async ({ page }) => {
  await press(page, '8', '÷', '2', '=');
  await expect(page.getByLabel('Result')).toHaveText('4');
  await press(page, '÷', '0', '=');
  await expect(page.getByLabel('Result')).toHaveText('Error');
});

test('clear resets both the display and pending operation', async ({ page }) => {
  await press(page, '9', '+', '5', 'AC');
  await expect(page.getByLabel('Result')).toHaveText('0');
  await press(page, '2', '=');
  await expect(page.getByLabel('Result')).toHaveText('2');
});
