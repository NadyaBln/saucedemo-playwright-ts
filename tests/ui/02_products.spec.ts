import { expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { test } from "../fixtures/auth.fixture";
import { PRODUCT_NAMES, SORT_OPTIONS } from "../../src/utils/testData";
import { TestUtils } from "../../src/utils/TestUtils";

test.describe("SauceDemo - Products Tests", () => {
  test("should display all products on products page", async ({ productsPage }) => {
    await expect(productsPage.productContainer).toBeVisible();

    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test(
    "should add product to cart by name",
    { tag: "@smoke" },
    async ({ productsPage, navigationBar }) => {
      await productsPage.addProductToCartByName(PRODUCT_NAMES.BACKPACK);

      expect(await navigationBar.isCartBadgeVisible()).toBeTruthy();
      expect(await navigationBar.getCartBadgeCount()).toBe(1);
    },
  );

  test("should add multiple products to cart", async ({ productsPage, navigationBar }) => {
    await productsPage.addProductToCartByName(PRODUCT_NAMES.BACKPACK);
    await productsPage.addProductToCartByName(PRODUCT_NAMES.BIKE_LIGHT);
    await productsPage.addProductToCartByName(PRODUCT_NAMES.BOLT_TSHIRT);

    expect(await navigationBar.getCartBadgeCount()).toBe(3);
  });

  test(
    "should remove product from cart",
    { tag: "@smoke" },
    async ({ productsPage, navigationBar }) => {
      await productsPage.addProductToCartByName(PRODUCT_NAMES.BACKPACK);
      expect(await navigationBar.getCartBadgeCount()).toBe(1);

      await productsPage.removeProductFromCartByName(PRODUCT_NAMES.BACKPACK);
      expect(await navigationBar.isCartBadgeVisible()).toBeFalsy();
    },
  );

  test("should get product names and prices", async ({ productsPage }) => {
    const productNames = await productsPage.getAllProductNames();
    const productPrices = await productsPage.getAllProductPrices();

    expect(productNames.length).toBeGreaterThan(0);
    expect(productPrices.length).toBeGreaterThan(0);
    expect(productNames.length).toBe(productPrices.length);
  });

  test("should sort products by price low to high", async ({ productsPage }) => {
    await productsPage.sortProductsBy(SORT_OPTIONS.LOW_TO_HIGH);

    const prices = await productsPage.getAllProductPrices();
    const numericPrices = prices.map((p) => TestUtils.extractPrice(p));

    for (let i = 0; i < numericPrices.length - 1; i++) {
      expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
    }
  });

  //accessibility test
  test("products page has no critical a11y violations", async ({ productsPage }) => {
    test.fail(
      true,
      "Known issue: SauceDemo's product sort <select> has no accessible name (axe rule 'select-name', WCAG 4.1.2)",
    );
    const results = await new AxeBuilder({ page: productsPage.page }).analyze();
    expect(results.violations.filter((v) => v.impact === "critical")).toHaveLength(0);
  });
});
