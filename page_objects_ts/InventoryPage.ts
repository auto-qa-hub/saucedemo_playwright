import { test, expect, Locator, Page } from "@playwright/test";
export class InventoryPage {
  page: Page;
  userMenu: Locator;
  logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMenu = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async UserMenuIcon() {
    await this.userMenu.click();
  }
  async Logout() {
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
