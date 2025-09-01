import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Go to Test Cases Page', () => {
  test('', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await expect(homePage.testCasesLink).toBeVisible();
    await homePage.goToTestCases();
    await expect(page).toHaveURL('https://automationexercise.com/test_cases');
  });
});

test.describe('Footer subscription', () => {
  test('Should successfully subscribe from the home page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(page.locator('body')).toContainText('Home');
    await homePage.scrollToFooter();
    await expect(homePage.subscriptionTitle).toBeVisible();
    const email = 'gonzalo@example.com';
    await homePage.subscribe(email);
    await expect(homePage.subscriptionSuccessMessage).toContainText('You have been successfully subscribed!');
  });
});