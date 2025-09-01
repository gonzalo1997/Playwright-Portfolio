import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../pages/ContactUsPage';

test.describe('Contact Us Form', () => {
  test('should submit the form successfully with file upload', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    await contactUsPage.navigate();

    await contactUsPage.fillContactForm({
      name: 'Gonzalo',
      email: 'gonzalo@example.com',
      subject: 'Technical Issue',
      message: 'Im testing the contact form with Playwright.',
      filePath: 'assets/testFile.txt', // Make sure this file exists
    });

    await contactUsPage.submitForm();
    await expect(contactUsPage.successMessage).toHaveText('Success! Your details have been submitted successfully.');
    await contactUsPage.continueToHome();
  });
});
