import { test, expect } from "@playwright/test";
import { MainPage } from "../page_objects_ts/MainPage";
import usersData from "../fixtures/usersData.json";
import { InventoryPage } from "../page_objects_ts/InventoryPage";
import usersBillingData from "../fixtures/usersBillingData.json";

test.describe("Visual user tests", () => {
  test("Visual user issues", async ({ page }) => {
    const mainPage = new MainPage(page);
    const inventoryPage = new InventoryPage(page);
    const username = usersData.users[5];
    const password = usersData.password;

    await mainPage.visitMainPage();
    await mainPage.fillUsername(username);
    await mainPage.fillPassword(password);

    await expect(page.locator('input[name="user-name"]')).toHaveValue(username);
    await expect(page.locator('input[name="password"]')).toHaveValue(password);

    await mainPage.loginButton();

    await page.waitForURL("/inventory.html");
    await inventoryPage.UserMenuIcon();
    await expect(
      page.locator('img[class*="bm-cross visual_failure"]')
    ).toBeVisible();
    await inventoryPage.closeMenuIcon();
    await expect(
      page.locator('img[class*="bm-cross visual_failure"]')
    ).toBeVisible();

    // Verify title class and spacing
    const idElementOne = page.locator(
      "#item_1_title_link .inventory_item_name"
    );
    await expect(idElementOne).toHaveText("Sauce Labs Bolt T-Shirt");
    await expect(idElementOne).toHaveClass(/inventory_item_name\s+align_right/);

    const idElementTwo = page.locator(
      "#item_5_title_link .inventory_item_name"
    );
    await expect(idElementTwo).toHaveText("Sauce Labs Fleece Jacket");
    await expect(idElementTwo).toHaveClass(/inventory_item_name\s+align_right/);

    //Verify shopping icon and badge
    const shoppingCart = page.locator("#shopping_cart_container");
    await expect(shoppingCart).toHaveClass(
      /shopping_cart_container\s+visual_failure/
    );
    await inventoryPage.addToCartFirstItem();
    await expect(
      page.locator('a span[class="shopping_cart_badge"]')
    ).toBeVisible();

    await inventoryPage.ShopContainerIcon();
    await page.goto("/cart.html");
    // Locate the item name using data-test attribute
    const itemName = page.locator('[data-test="inventory-item-name"]');

    // Verify the item name is "Sauce Labs Backpack"
    await expect(itemName).toHaveText("Sauce Labs Backpack");

    // Verify Checkout button exists and is clickable
    const checkoutButton = page.locator("button", { hasText: "Checkout" });
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toHaveClass(
      /btn\s+btn_action\s+btn_medium\s+checkout_button\s+btn_visual_failure/
    );

    // Click on Checkout button
    await checkoutButton.click();

    await expect(shoppingCart).toHaveClass(
      /shopping_cart_container\s+visual_failure/
    );
    await expect(
      page.locator('a span[class="shopping_cart_badge"]')
    ).toBeVisible();
  });
});
