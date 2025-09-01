import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Page Subscription Test', () => {
  test('Should successfully subscribe from the cart page footer', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.navigate();

    // Scroll down to the footer section
    await cartPage.scrollToFooter();

    // Verify the presence of 'SUBSCRIPTION' text
    await expect(cartPage.subscriptionTitle).toBeVisible();

    // Enter email address and click the arrow button
    const email = 'gonzalo@example.com';
    await cartPage.subscribe(email);

    // Verify success message is visible
    await expect(cartPage.subscriptionSuccessMessage).toContainText('You have been successfully subscribed!');
  });
});
