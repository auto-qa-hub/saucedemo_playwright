import { test, expect } from "@playwright/test";
import usersData from "../fixtures/usersData.json";
import { POManager } from "../page_objects_ts/POManager";

test.describe("Tests for error user", () => {
  test("Login, adding and remove from cart iteams", async ({ page }) => {
    const poManager = new POManager(page);
    const username = usersData.users[4];
    const password = usersData.password;

    await poManager.mainPage.visitMainPage();
    await poManager.mainPage.fillUsername(username);
    await poManager.mainPage.fillPassword(password);
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
  });

  test("Verify sorting error modal", async ({ page }) => {
    const poManager = new POManager(page);
    const username = usersData.users[4];
    const password = usersData.password;

    // Login to the application
    await poManager.mainPage.visitMainPage();
    await poManager.mainPage.fillUsername(username);
    await poManager.mainPage.fillPassword(password);
    await poManager.mainPage.loginButton();
    await page.waitForURL("/inventory.html");

    // Set up alert handling BEFORE triggering sorting
    const dialogPromise = new Promise((resolve) => {
      page.once("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message());
        expect(dialog.message()).toContain("Sorting is broken!");
        await dialog.dismiss(); // Clicks "OK"
        resolve(true);
      });
    });

    // Select the sorting option
    await page.selectOption(".product_sort_container", "za");

    // Ensure the alert was handled
    await dialogPromise;
  });

  test("Last name field issue that causing failure with purshase", async ({ page }) => {
    const poManager = new POManager(page);
    const username = usersData.users[4];
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
    await poManager.checkoutStepTwoPage.completeCheckout();

    // Assert Finish button is visible and enabled (clickable)
    await expect(poManager.checkoutStepTwoPage.finishButton).toBeVisible();
    await expect(poManager.checkoutStepTwoPage.finishButton).toBeEnabled();

    await page.waitForTimeout(1000);

    // Assert the user remains on the same page (URL does not change)
    await expect(page).toHaveURL("/checkout-step-two.html");
  });
});
