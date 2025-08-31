import { Page, Locator } from '@playwright/test';

export class SignupPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/signup');
  }

  async fillAccountInfo(name: string, email: string, password: string) {
    await this.page.locator('[data-qa="signup-name"]').fill(name);
    await this.page.locator('[data-qa="signup-email"]').fill(email);
    await this.page.locator('[data-qa="signup-button"]').click();

    await this.page.locator('#password').fill(password);
    await this.page.locator('#days').selectOption('10');
    await this.page.locator('#months').selectOption('5');
    await this.page.locator('#years').selectOption('1997');
    //await this.page.locator('#uniform-newsletter').check();
    //await this.page.locator('#uniform-optin').check();
  }

  async fillAddressInfo() {
    await this.page.locator('#first_name').fill('Pedro');
    await this.page.locator('#last_name').fill('Pascal');
    await this.page.locator('#company').fill('TestCorp');
    await this.page.locator('#address1').fill('Av. Siempre Viva 123');
    await this.page.locator('#address2').fill('Av. Siempre Muerta 123');
    await this.page.locator('#country').selectOption('United States');
    await this.page.locator('#state').fill('Buenos Aires');
    await this.page.locator('#city').fill('CABA');
    await this.page.locator('#zipcode').fill('1000');
    await this.page.locator('#mobile_number').fill('+5491123456789');
  }

  async submitForm() {
    await this.page.locator('[data-qa="create-account"]').click();
  }

  async continueToHome() {
    await this.page.locator('[data-qa="continue-button"]').click();
  }
}
