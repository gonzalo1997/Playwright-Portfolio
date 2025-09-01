import { Page, Locator } from '@playwright/test';

export class HomePage {
  private page: Page;
  private logoutButton: Locator;
  private deleteAccountButton: Locator;
  // Header locators
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiTestingLink: Locator;
  readonly videoTutorialsLink: Locator;
  readonly contactUsLink: Locator;

  // Subscription section
  readonly subscriptionSection: Locator;
  readonly subscriptionTitle: Locator;
  readonly subscriptionInput: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Header
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.testCasesLink = page.locator('header a[href="/test_cases"]');
    this.apiTestingLink = page.getByRole('link', { name: 'API Testing' });
    this.videoTutorialsLink = page.getByRole('link', { name: 'Video Tutorials' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });

    this.logoutButton = page.locator('a:has-text("Logout")');
    this.deleteAccountButton = page.locator('a:has-text("Delete Account")');

    // Header
    this.productsLink = page.locator('.navbar-nav a[href="/products"]');

    // Footer subscription
    this.subscriptionSection = page.locator('#footer');
    this.subscriptionTitle = this.subscriptionSection.locator('h2:has-text("Subscription")');
    this.subscriptionInput = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccessMessage = page.locator('div#success-subscribe:has-text("You have been successfully subscribed!")');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async scrollToFooter() {
    await this.subscriptionSection.scrollIntoViewIfNeeded();
  }

  async subscribe(email: string) {
    await this.subscriptionInput.fill(email);
    await this.subscriptionButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
  
  async deleteAccount() {
    await this.deleteAccountButton.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async goToTestCases() {
    await this.testCasesLink.click();
  }

  async goToApiTesting() {
    await this.apiTestingLink.click();
  }

  async goToVideoTutorials() {
    await this.videoTutorialsLink.click();
  }

  async goToContactUs() {
    await this.contactUsLink.click();
  }
}
