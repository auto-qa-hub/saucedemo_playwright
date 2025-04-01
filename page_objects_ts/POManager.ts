import { CartPage } from "./CartPage";
import { CheckoutCompletePage } from "./CheckoutCompletePage";
import { CheckoutStepOnePage } from "./CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "./CheckoutStepTwoPage";
import { InventoryPage } from "./InventoryPage";
import { MainPage } from "./MainPage";
import { UserMenuPage } from "./UserMenuPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class POManager {
  page: Page;
  cartPage: CartPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  inventoryPage: InventoryPage;
  mainPage: MainPage;
  userMenuPage: UserMenuPage;

  constructor(page: Page) {
    this.page = page;
    this.cartPage = new CartPage(this.page);
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
    this.checkoutStepOnePage = new CheckoutStepOnePage(this.page);
    this.checkoutStepTwoPage = new CheckoutStepTwoPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.mainPage = new MainPage(this.page);
    this.userMenuPage = new UserMenuPage(this.page);
  }
  getCartPage() {
    return this.cartPage;
  }
  getCheckoutCompletePage() {
    return this.checkoutCompletePage;
  }
  getCheckoutStepOnePage() {
    return this.checkoutStepOnePage;
  }
  getCheckoutStepTwoPage() {
    return this.checkoutStepTwoPage;
  }
  getInventoryPage() {
    return this.inventoryPage;
  }
  getMainPage() {
    return this.mainPage;
  }
  getUserMenuPage() {
    return this.userMenuPage;
  }
}
module.exports = { POManager };
