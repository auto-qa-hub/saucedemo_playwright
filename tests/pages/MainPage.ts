import { Page } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}

  async visitMainPage() {
    await this.page.goto('/');
  }
  async fillUsername(username: string) {
    await this.page.fill('input[name="user-name"]', username);
  }
  async fillPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }
  async loginButton() {
    await this.page.click('#login-button');
  }
}
