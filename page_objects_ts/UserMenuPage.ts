import { Locator, Page } from "@playwright/test";
export class UserMenuPage {
  page: Page;
  userMenu: Locator;
  crossUserMenuIcon: Locator;
  logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMenu = page.locator("#react-burger-menu-btn");
    this.crossUserMenuIcon = page.locator("#react-burger-cross-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async UserMenuIcon() {
    await this.userMenu.click();
  }
  async closeMenuIcon() {
    await this.crossUserMenuIcon.click();
  }
  async Logout() {
    await this.logoutLink.click();
  }
}

module.exports = { UserMenuPage };
