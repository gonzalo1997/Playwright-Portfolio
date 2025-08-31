import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login User with correct email and password', () => {
  test('Wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('gonzalo123@gmail.com', 'gonzalo123');

    // Validación básica: redirección o mensaje visible
    //await expect(page).toHaveURL(/\/products/); // o la URL que aparece post-login
    await expect(page.getByText('Logged in as')).toBeVisible(); // texto visible tras login
  });
});

test.describe('Login User with incorrect email and password', () => {
  test('', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('gonzalo123@gmail.com', 'gonzalo123');

    // Validación básica: redirección o mensaje visible
    //await expect(page).toHaveURL(/\/products/); // o la URL que aparece post-login
    await expect(page.getByText('Logged in as')).toBeVisible(); // texto visible tras login
  });
});
