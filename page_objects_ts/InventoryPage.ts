import { test, expect, Locator, Page } from "@playwright/test";
export class InventoryPage {
  page: Page;
  userMenu: Locator;
  crossUserMenuIcon: Locator;
  logoutLink: Locator;
  addToCartFirstButtonItem: Locator;
  shoppingContainerIcon:Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMenu = page.locator("#react-burger-menu-btn");
    this.crossUserMenuIcon = page.locator("#react-burger-cross-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.addToCartFirstButtonItem = page.locator("#add-to-cart-sauce-labs-backpack")
    this.shoppingContainerIcon = page.locator("#shopping_cart_container");
  }

  async UserMenuIcon() {
    await this.userMenu.click();
  }
  async closeMenuIcon() {
    await this.crossUserMenuIcon.click();
  }
  async addToCartFirstItem(){
    await this.addToCartFirstButtonItem.click();
  }
  async ShopContainerIcon(){
    await this.shoppingContainerIcon.click();
  }
  async Logout() {
    await this.logoutLink.click();
  }
  
}

module.exports = { InventoryPage };
