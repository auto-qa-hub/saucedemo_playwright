import { test, expect } from "@playwright/test";
import usersData from "../fixtures/usersData.json";
import { POManager } from "../page_objects_ts/POManager";

test.describe("Tests for locked user", () => {
  test("Attempt to login with locked user creds", async ({ page }) => {
    const poManager = new POManager(page);
    const username = usersData.users[1];
    const password = usersData.password;

    await poManager.mainPage.visitMainPage();
    await poManager.mainPage.fillUsername(username);
    await poManager.mainPage.fillPassword(password);

    await expect(page.locator('input[name="user-name"]')).toHaveValue(username);
    await expect(page.locator('input[name="password"]')).toHaveValue(password);

    await poManager.mainPage.loginButton();
    await page.getByPlaceholder("Username").isVisible();
    await expect(page.locator("svg.error_icon").first()).toBeVisible();
    await page.getByPlaceholder("Password").isVisible();
    await expect(page.locator("svg.error_icon").last()).toBeVisible();
    await expect(
      page.locator('div[class*="error-message-container"]')
    ).toBeVisible();
    await page
      .getByAltText("Epic sadface: Sorry, this user has been locked out.")
      .isVisible();
  });
});
