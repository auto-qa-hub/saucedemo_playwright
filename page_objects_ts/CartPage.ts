import { Locator, Page } from "@playwright/test";
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly itemQuantities: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.removeButtons = page.locator(".inventory_item_price");
    this.checkoutButton = page.locator("#checkout");
    this.continueShoppingButton = page.locator("#continue-shopping");
    this.itemNames = page.locator(".inventory_item_name");
    this.itemPrices = page.locator(".inventory_item_price");
    this.itemQuantities = page.locator(".cart_quantity");
  }

  async removeItem(index: number) {
    await this.removeButtons.nth(index).click();
  }

  async verifyItemExists(itemName: string) {
    await this.page.locator(`text=${itemName}`).waitFor();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getItemPrice(index: number): Promise<string> {
    return await this.itemPrices.nth(index).innerText();
  }

  async getItemQuantity(index: number): Promise<string> {
    return await this.itemQuantities.nth(index).innerText();
  }
}

module.exports = { CartPage };
