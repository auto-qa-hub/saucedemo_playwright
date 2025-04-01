import { Locator, Page } from "@playwright/test";
export class CheckoutStepOnePage{
  page: Page;
  firstNameInput: Locator;
  lastNameInput: Locator;
  zipCodeInput: Locator;
  continueButton: Locator;
  cancelButton: Locator;
  errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.zipCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.cancelButton = page.locator("#cancel");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async enterCheckoutDetails(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async submitCheckout() {
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}
module.exports = { CheckoutStepOnePage };
