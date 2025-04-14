import { test, expect } from "@playwright/test";
import usersData from "../fixtures/usersData.json";
import { POManager } from "../page_objects_ts/POManager";

test.describe("Problem user tests", () => {
  test("Problem user sees the same image for all products", async ({
    page,
  }) => {
    const poManager = new POManager(page);
    const username = usersData.users[2]; // "problem_user"
    const password = usersData.password;

    // Step 1: Login
    await poManager.mainPage.visitMainPage();
    await poManager.mainPage.fillUsername(username);
    await poManager.mainPage.fillPassword(password);

    await expect(page.locator('input[name="user-name"]')).toHaveValue(username);
    await expect(page.locator('input[name="password"]')).toHaveValue(password);

    await poManager.mainPage.loginButton();
    await page.waitForURL("/inventory.html");

    // Step 2: Verify all product images are visible
    const productItems = await page.locator(".inventory_item");
    const count = await productItems.count();

    for (let i = 0; i < count; i++) {
      const image = productItems.nth(i).locator("img");
      await expect(image).toBeVisible();
    }

    // Step 3: Assert all images have the same `src` attribute
    const allImageSrcs = await page.$$eval(".inventory_item img", (imgs) =>
      imgs.map((img) => img.getAttribute("src"))
    );

    const uniqueSrcs = new Set(allImageSrcs);
    expect(uniqueSrcs.size).toBe(1); // Problem user sees repeated images
  });

  test("Problem user login, adding and remove from cart items", async ({
    page,
  }) => {
    const poManager = new POManager(page);
    const username = usersData.users[2]; // "problem_user"
    const password = usersData.password;

    // Step 1: Login
    await poManager.mainPage.visitMainPage();
    await poManager.mainPage.fillUsername(username);
    await poManager.mainPage.fillPassword(password);

    await expect(page.locator('input[name="user-name"]')).toHaveValue(username);
    await expect(page.locator('input[name="password"]')).toHaveValue(password);

    await poManager.mainPage.loginButton();
    await page.waitForURL("/inventory.html");
    await poManager.inventoryPage.addToCartFirstItem();
    await expect(poManager.inventoryPage.removeButtonFirstItem).toBeVisible();
    await poManager.inventoryPage.removeFirstItem();
    await expect(
      poManager.inventoryPage.addToCartFirstButtonItem
    ).not.toBeVisible();

    await poManager.inventoryPage.addToCart2ndItem();
    await expect(poManager.inventoryPage.removeButton2ndItem).toBeVisible();
    await poManager.inventoryPage.remove2ndItem();
    await expect(
      poManager.inventoryPage.addToCartButton2ndItem
    ).not.toBeVisible();

    await poManager.inventoryPage.addToCart3rdItem();
    await expect(poManager.inventoryPage.addToCartButton3rdItem).toBeVisible();
    await expect(poManager.inventoryPage.removeButton3rdItem).not.toBeVisible();

    await poManager.inventoryPage.addToCart4thItem();
    await expect(poManager.inventoryPage.addToCartButton4thItem).toBeVisible();
    await expect(poManager.inventoryPage.removeButton4thItem).not.toBeVisible();

    await poManager.inventoryPage.addToCart5thItem();
    await expect(poManager.inventoryPage.removeButton5thItem).toBeVisible();
    await poManager.inventoryPage.remove5thItem();
    await expect(
      poManager.inventoryPage.addToCartButton5thItem
    ).not.toBeVisible();

    await poManager.inventoryPage.addToCart6thItem();
    await expect(poManager.inventoryPage.addToCartButton6thItem).toBeVisible();
    await expect(poManager.inventoryPage.removeButton6thItem).not.toBeVisible();

    await poManager.inventoryPage.ShopContainerIcon();
    const itemsToRemove = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Onesie",
    ];

    for (const item of itemsToRemove) {
      await poManager.cartPage.removeItemByName(item);
      await poManager.cartPage.assertItemRemovedByName(item);
    }
  });
  test("Last name field issue that causing failure with purshase", async ({
    page,
  }) => {
    const poManager = new POManager(page);
    const username = usersData.users[2];
    const password = usersData.password;

    // Login to the application
    await poManager.mainPage.visitMainPage();
    await poManager.mainPage.fillUsername(username);
    await poManager.mainPage.fillPassword(password);
    await poManager.mainPage.loginButton();
    await page.waitForURL("/inventory.html");

    await poManager.inventoryPage.addToCartFirstItem();
    await poManager.inventoryPage.ShopContainerIcon();
    await poManager.cartPage.clickCheckout();
    await poManager.checkoutStepOnePage.enterCheckoutDetails(
      "Yulia",
      "Test",
      "34221"
    );
    await poManager.checkoutStepOnePage.submitCheckout();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Error: Last Name is required"
    );
    await page.waitForTimeout(1000);

    // Assert the user remains on the same page (URL does not change)
    await expect(page).toHaveURL("/checkout-step-one.html");
  });
});
