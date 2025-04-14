import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly itemQuantities: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
    this.continueShoppingButton = page.locator("#continue-shopping");
    this.itemNames = page.locator(".inventory_item_name");
    this.itemPrices = page.locator(".inventory_item_price");
    this.itemQuantities = page.locator(".cart_quantity");
  }

  // ✅ Dynamic selector for "Remove" button based on item name
  private removeButtonByName(productName: string): Locator {
    const idFriendly = productName.toLowerCase().replaceAll(" ", "-");
    return this.page.locator(`#remove-${idFriendly}`);
  }

  // ✅ Remove item by product name
  async removeItemByName(productName: string) {
    const button = this.removeButtonByName(productName);
    await button.click();
  }

  // ✅ Assert item is removed by name
  async assertItemRemovedByName(productName: string) {
    const button = this.removeButtonByName(productName);
    await expect(button).toHaveCount(0);
  }

  // 🧪 Still keep the index-based methods if needed
  async removeItem(index: number) {
    const removeButton = this.cartItems
      .nth(index)
      .locator('button[id^="remove-"]');
    await removeButton.click();
  }

  async assertItemRemoved(indexes: number[]) {
    for (const index of indexes) {
      const item = this.cartItems.nth(index);
      await expect(item).not.toBeVisible(); // or .toHaveCount(0)
    }
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
