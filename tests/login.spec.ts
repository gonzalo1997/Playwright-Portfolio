import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Smoke Test - Login', () => {
  test('Debería loguearse correctamente con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('gonzalo123@gmail.com', 'gonzalo123');

    // Validación básica: redirección o mensaje visible
    //await expect(page).toHaveURL(/\/products/); // o la URL que aparece post-login
    await expect(page.getByText('Logged in as')).toBeVisible(); // texto visible tras login
  });
});
