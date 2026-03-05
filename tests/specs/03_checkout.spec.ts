import { expect } from "@playwright/test";
import { test } from "../fixtures/auth.fixture";
import { PRODUCT_NAMES, CHECKOUT_INFO, SUCCESS_MESSAGES } from "../../src/utils/testData";

test.describe("SauceDemo - Complete Purchase Flow", () => {
  test("should complete full purchase flow with single product", async ({
    productsPage,
    navigationBar,
    cartPage,
    checkoutPage,
    confirmationPage,
  }) => {
    await productsPage.addProductToCartByName(PRODUCT_NAMES.BACKPACK);
    expect(await navigationBar.getCartBadgeCount()).toBe(1);

    // Go to cart
    await navigationBar.clickOnCart();
    await expect(cartPage.cartContainer).toBeVisible();
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    // Proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(checkoutPage.firstNameInput).toBeVisible();

    // Fill checkout information
    await checkoutPage.completeCheckoutStepOne(
      CHECKOUT_INFO.VALID_INFO.firstName,
      CHECKOUT_INFO.VALID_INFO.lastName,
      CHECKOUT_INFO.VALID_INFO.zipCode,
    );
    await expect(checkoutPage.finishButton).toBeVisible();

    // Verify order summary
    const itemsTotal = await checkoutPage.getItemTotal();
    expect(itemsTotal).toBeTruthy();

    // Finish order
    await checkoutPage.finishCheckout();
    await expect(confirmationPage.confirmationContainer).toBeVisible();

    const confirmationText = await confirmationPage.getConfirmationHeaderText();
    expect(confirmationText.toLowerCase()).toContain(SUCCESS_MESSAGES.ORDER_COMPLETE.toLowerCase());
  });

  test("should complete purchase with multiple products", async ({
    productsPage,
    navigationBar,
    cartPage,
    checkoutPage,
  }) => {
    const productsToAdd = [
      PRODUCT_NAMES.BACKPACK,
      PRODUCT_NAMES.BIKE_LIGHT,
      PRODUCT_NAMES.BOLT_TSHIRT,
    ];

    for (const product of productsToAdd) {
      await productsPage.addProductToCartByName(product);
    }

    expect(await navigationBar.getCartBadgeCount()).toBe(productsToAdd.length);

    // Go to cart
    await navigationBar.clickOnCart();
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(productsToAdd.length);

    // Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutStepOne(
      CHECKOUT_INFO.VALID_INFO.firstName,
      CHECKOUT_INFO.VALID_INFO.lastName,
      CHECKOUT_INFO.VALID_INFO.zipCode,
    );

    // Verify all products are in checkout summary
    const checkoutItemCount = await checkoutPage.getCartItemsCountStepTwo();
    expect(checkoutItemCount).toBe(productsToAdd.length);
  });

  test("should remove item from cart", async ({ productsPage, navigationBar, cartPage }) => {
    await productsPage.addProductToCartByName(PRODUCT_NAMES.BACKPACK);
    await productsPage.addProductToCartByName(PRODUCT_NAMES.BIKE_LIGHT);

    expect(await navigationBar.getCartBadgeCount()).toBe(2);

    // Go to cart and remove one item
    await navigationBar.clickOnCart();
    await cartPage.removeItemFromCartByName(PRODUCT_NAMES.BACKPACK);

    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test("should show error when missing checkout information", async ({
    productsPage,
    navigationBar,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.addProductToCartByName(PRODUCT_NAMES.BACKPACK);
    await navigationBar.clickOnCart();
    await cartPage.proceedToCheckout();

    // Try to continue without filling required fields
    await checkoutPage.continueToStepTwo();

    // Should still be on step one with error
    await expect(checkoutPage.errorMessage).toBeVisible();
  });
});
