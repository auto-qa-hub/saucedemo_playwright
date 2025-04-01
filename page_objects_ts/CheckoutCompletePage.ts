import { Locator, expect, Page } from "@playwright/test";
export class CheckoutCompletePage {
  page: Page;
  confirmationMessage: Locator;
  orderStatusMessage: Locator;
  backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationMessage = page.locator(".complete-header");
    this.orderStatusMessage = page.locator(".complete-text");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async getConfirmationMessage(): Promise<string> {
    return (await this.confirmationMessage.textContent()) ?? "";
  }

  async getOrderStatusMessage(): Promise<string> {
    return (await this.orderStatusMessage.textContent()) ?? "";
  }

  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  async verifyPageElements(): Promise<void> {
    await expect(this.confirmationMessage).toHaveText( "Thank you for your order!");
    await expect(this.orderStatusMessage).toContainText("Your order has been dispatched");
    await expect(this.backHomeButton).toBeVisible();
  }
}

module.exports = { CheckoutCompletePage };
