import { test as base } from "@playwright/test";
import { LoginPage } from "../../src/pages/LoginPage";
import { ProductsPage } from "../../src/pages/ProductsPage";
import { NavigationBar } from "../../src/pages/NavigationBar";
import { CartPage } from "../../src/pages/CartPage";
import { CheckoutPage } from "../../src/pages/CheckoutPage";
import { ConfirmationPage } from "../../src/pages/ConfirmationPage";
import { TEST_CREDENTIALS } from "../../src/utils/testData";

//Performs login before each test. Use this for specs that require a logged-in user state.
export const test = base.extend<{
  productsPage: ProductsPage;
  navigationBar: NavigationBar;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  confirmationPage: ConfirmationPage;
}>({
  productsPage: async ({ page }, use) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(
      TEST_CREDENTIALS.VALID_USER.username,
      TEST_CREDENTIALS.VALID_USER.password,
    );
    await use(new ProductsPage(page));
  },

  navigationBar: async ({ productsPage }, use) => {
    await use(new NavigationBar(productsPage.page));
  },

  cartPage: async ({ productsPage }, use) => {
    await use(new CartPage(productsPage.page));
  },

  checkoutPage: async ({ productsPage }, use) => {
    await use(new CheckoutPage(productsPage.page));
  },

  confirmationPage: async ({ productsPage }, use) => {
    await use(new ConfirmationPage(productsPage.page));
  },
});
