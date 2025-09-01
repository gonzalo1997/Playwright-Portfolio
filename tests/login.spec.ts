import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Login User with correct email and password', () => {
  test('Wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('gonzalo123@gmail.com', 'gonzalo123');

    await expect(page.getByText('Logged in as')).toBeVisible();
  });
});

test.describe('Login User with incorrect email and password', () => {
  test('should show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('wrongemail@gmail.com', 'wrongpassword');
    await expect (page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
});

test.describe('Logout User', () => {
  test('cant logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigate();
    await loginPage.login('gonzalo123@gmail.com', 'gonzalo123');

    await homePage.logout();
    await expect(page).toHaveURL(/\/login/);
  });
});
