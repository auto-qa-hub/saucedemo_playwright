import { Page } from "@playwright/test";

export class MainPage {
  constructor(private page: Page) {}

  async visitMainPage() {
    await this.page.goto("/");
  }
  async fillUsername(username: string) {
    await this.page.fill('input[name="user-name"]', username);
  }
  async fillPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }
  async loginButton() {
    await this.page.click("#login-button");
  }
  async loginErrorMessage() {
    this.page.locator('div[class*="error-message-container"]');
  }
  async closeSvgIconForFields() {
    this.page.locator("svg.error_icon");
  }
}
