import { Locator, Page } from "@playwright/test";
export class CheckoutStepTwoPage{
  page: Page;
  productNames: Locator;
  itemTotal: Locator;
  taxAmount: Locator;
  totalAmount: Locator;
  finishButton: Locator;
  cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNames = page.locator(".inventory_item_name");
    this.itemTotal = page.locator(".summary_subtotal_label");
    this.taxAmount = page.locator(".summary_tax_label");
    this.totalAmount = page.locator(".summary_total_label");
    this.finishButton = page.locator("#finish");
    this.cancelButton = page.locator("#cancel");
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getItemTotal(): Promise<string> {
    return await this.itemTotal.innerText();
  }

  async getTaxAmount(): Promise<string> {
    return await this.taxAmount.innerText();
  }

  async getTotalAmount(): Promise<string> {
    return await this.totalAmount.innerText();
  }

  async completeCheckout() {
    await this.finishButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }
}

module.exports = { CheckoutStepTwoPage };
