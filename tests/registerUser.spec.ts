import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';

test.describe('Smoke Test - Register', () => {
  test('Debería registrarse correctamente con credenciales válidas', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);

    await signupPage.goto();
    await signupPage.fillAccountInfo('Pedro456', 'pedro456@gmail.com', 'pedro456');
    await signupPage.fillAddressInfo();
    await signupPage.submitForm();
    // Validación básica: redirección o mensaje visible
    await expect(page).toHaveURL(/\/account_created/);
    await expect(page.getByText('Account Created!')).toBeVisible();
    await signupPage.continueToHome();
    await expect(page.getByText('Logged in as')).toBeVisible();

    await homePage.deleteAccount();
    await expect(page).toHaveURL(/\/delete_account/);
    await expect(page.getByText('Account Deleted!')).toBeVisible();
  });
});
