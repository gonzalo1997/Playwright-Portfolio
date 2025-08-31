import { Page, Locator } from '@playwright/test';

export class HomePage {
  private page: Page;
  private deleteAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteAccountButton = page.locator('a:has-text("Delete Account")');
  }

  async deleteAccount() {
    await this.deleteAccountButton.click();
  }
}
