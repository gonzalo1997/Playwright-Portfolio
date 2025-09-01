import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // Footer subscription
  readonly subscriptionSection: Locator;
  readonly subscriptionTitle: Locator;
  readonly subscriptionInput: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subscriptionSection = page.locator('#footer');
    this.subscriptionTitle = this.subscriptionSection.locator('h2:has-text("Subscription")');
    this.subscriptionInput = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccessMessage = page.locator('div#success-subscribe');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/view_cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async scrollToFooter() {
    await this.subscriptionSection.scrollIntoViewIfNeeded();
  }

  async subscribe(email: string) {
    await this.subscriptionInput.fill(email);
    await this.subscriptionButton.click();
  }
}
