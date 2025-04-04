import { Locator, Page } from "@playwright/test";
export class InventoryPage {
  page: Page;

  addToCartFirstButtonItem: Locator;
  removeButtonFirstItem: Locator;

  addToCartButton2ndItem: Locator;
  removeButton2ndItem: Locator;

  addToCartButton3rdItem: Locator;
  removeButton3rdItem: Locator;

  addToCartButton4thItem: Locator;
  removeButton4thItem: Locator;

  addToCartButton5thItem: Locator;
  removeButton5thItem: Locator;

  addToCartButton6thItem: Locator;
  removeButton6thItem: Locator;

  shoppingContainerIcon: Locator;
  shoppingCartBagde: Locator;

  productsSoftContainer: Locator

  constructor(page: Page) {
    this.page = page;
    this.addToCartFirstButtonItem = page.locator("#add-to-cart-sauce-labs-backpack");
    this.removeButtonFirstItem = page.locator("#remove-sauce-labs-backpack");

    this.addToCartButton2ndItem = page.locator("#add-to-cart-sauce-labs-bike-light");
    this.removeButton2ndItem = page.locator("#remove-sauce-labs-bike-light");

    this.addToCartButton3rdItem = page.locator("#add-to-cart-sauce-labs-bolt-t-shirt");
    this.removeButton3rdItem = page.locator("#remove-sauce-labs-bolt-t-shirt");

    this.addToCartButton4thItem = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
    this.removeButton4thItem = page.locator("#remove-sauce-labs-fleece-jacket");

    this.addToCartButton5thItem = page.locator("#add-to-cart-sauce-labs-onesie");
    this.removeButton5thItem = page.locator("#remove-sauce-labs-onesie");

    this.addToCartButton6thItem = page.locator('[id*="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    this.removeButton6thItem = page.locator('[id*="remove-test.allthethings()-t-shirt-(red)"]');

    this.shoppingContainerIcon = page.locator("#shopping_cart_container");
    this.shoppingCartBagde = page.locator('a span[class="shopping_cart_badge"]');
    this.productsSoftContainer = page.locator('.product_sort_container');
  }

  async addToCartFirstItem() {
    await this.addToCartFirstButtonItem.click();
  }
  async addToCart2ndItem() {
    await this.addToCartButton2ndItem.click();
  }
  async addToCart3rdItem() {
    await this.addToCartButton3rdItem.click();
  }
  async addToCart4thItem() {
    await this.addToCartButton4thItem.click();
  }
  async addToCart5thItem() {
    await this.addToCartButton5thItem.click();
  }
  async addToCart6thItem() {
    await this.addToCartButton6thItem.click();
  }
  async removeFirstItem() {
    await this.removeButtonFirstItem.click();
  }
  async remove2ndItem() {
    await this.removeButton2ndItem.click();
  }
  async remove3rdItem() {
    await this.removeButton3rdItem.click();
  }
  async remove4thItem() {
    await this.removeButton4thItem.click();
  }
  async remove5thItem() {
    await this.removeButton5thItem.click();
  }
  async remove6thItem() {
    await this.removeButton6thItem.click();
  }
  async ShopContainerIcon() {
    await this.shoppingContainerIcon.click();
  }
  async ProductsSortingClick() {
    await this.productsSoftContainer.click();
  }
}

module.exports = { InventoryPage };
