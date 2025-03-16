import { test, expect } from "@playwright/test";
import { MainPage } from "../page_objects_ts/MainPage";
import usersData from "../fixtures/usersData.json";
import { InventoryPage } from "../page_objects_ts/InventoryPage";

test.describe("Logout test", () => {
  test("Logout flow", async ({ page }) => {
    const mainPage = new MainPage(page);
    const inventoryPage = new InventoryPage(page);
    const username = usersData.users[0];
    const password = usersData.password;

    await mainPage.visitMainPage();
    await mainPage.fillUsername(username);
    await mainPage.fillPassword(password);
    await mainPage.loginButton();
    await page.waitForURL("/inventory.html");

    await inventoryPage.UserMenuIcon();
    await expect(page.locator("nav[class='bm-item-list']")).toBeVisible();
    await inventoryPage.Logout();
    await expect(page).toHaveURL('/')
  });
});
