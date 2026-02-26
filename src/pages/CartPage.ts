import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartContainer: Locator;
  readonly cartItems: Locator;
  readonly cartItemName: Locator;
  readonly cartItemPrice: Locator;
  readonly cartItemQuantity: Locator;
  readonly removeButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartBadge: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.cartContainer = page.locator(".cart_list");
    this.cartItems = page.locator(".cart_item");
    this.cartItemName = page.locator(".inventory_item_name");
    this.cartItemPrice = page.locator(".inventory_item_price");
    this.cartItemQuantity = page.locator(".cart_quantity");
    this.removeButton = page.locator('button[data-test*="remove"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async navigateToCart(): Promise<void> {
    await this.goto("/cart.html");
  }

  async getCartItemNames(): Promise<string[]> {
    const items = await this.cartItemName.allTextContents();
    return items;
  }

  async getCartItemPrices(): Promise<string[]> {
    const prices = await this.cartItemPrice.allTextContents();
    return prices;
  }

  async getCartItemCount(): Promise<number> {
    const items = await this.cartItems.all();
    return items.length;
  }

  async removeItemFromCartByName(productName: string): Promise<void> {
    const item = this.page.locator(`.cart_item:has-text("${productName}")`);
   await item.locator('button[data-test*="remove"]').click();
  }

  async removeItemFromCartByIndex(index: number): Promise<void> {
    const buttons = await this.removeButton.all();
    await buttons[index].click();
  }

  async isCartEmpty(): Promise<boolean> {
    const itemCount = await this.getCartItemCount();
    return itemCount === 0;
  }

  async continueShopping(): Promise<void> {
    await (this.continueShoppingButton).click();
    await this.page.waitForLoadState();
  }

  async proceedToCheckout(): Promise<void> {
    await (this.checkoutButton).click();
    await this.page.waitForLoadState();
  }

  async isCheckoutButtonVisible(): Promise<boolean> {
    return await (this.checkoutButton).isVisible();
  }

  async getItemDetailsByName(productName: string) {
    const item = this.cartItems.filter({ hasText: productName }).first();
    const name = await item.locator(".inventory_item_name").textContent();
    const price = await item.locator(".inventory_item_price").textContent();
    const quantity = await item.locator(".cart_quantity").textContent();

    return { name, price, quantity };
  }

  async expectToBeLoaded(): Promise<void> {
    await expect(this.cartContainer).toBeVisible();
  }
}
