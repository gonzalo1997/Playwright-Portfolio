import { Page, Locator } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly uploadInput: Locator;
  readonly submitButton: Locator;
  readonly goBackToHomeButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageTextarea = page.locator('textarea[data-qa="message"]');
    this.uploadInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.goBackToHomeButton = page.locator('#form-section');
    this.successMessage = page.locator('div.status.alert-success');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/contact_us');
  }

  async fillContactForm({
    name,
    email,
    subject,
    message,
    filePath,
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
    filePath?: string;
  }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageTextarea.fill(message);
    if (filePath) {
      await this.uploadInput.setInputFiles(filePath);
    }
  }

  async submitForm() {
    this.page.once('dialog', async (dialog) => await dialog.accept());
    await this.submitButton.click();
  }

  async continueToHome() {
    await this.goBackToHomeButton.click();
  }
}

