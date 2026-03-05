import { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  readonly productContainer: Locator;
  readonly productItems: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.productContainer = page.locator(".inventory_container");
    this.productItems = page.locator(".inventory_item");
    this.productName = page.locator(".inventory_item .inventory_item_name");
    this.productPrice = page.locator(".inventory_item .inventory_item_price");
    this.addToCartButton = page.locator('button[data-test*="add-to-cart"]');
    this.removeButton = page.locator('button[data-test*="remove"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async navigateToProducts(): Promise<void> {
    await this.goto("/inventory.html");
  }

  async getAllProductNames(): Promise<string[]> {
    return this.productName.allTextContents();
  }

  async getAllProductPrices(): Promise<string[]> {
    return this.productPrice.allTextContents();
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const productLocator = this.page.locator(
      `.inventory_item:has-text("${productName}") button[data-test*="add-to-cart"]`,
    );
    await productLocator.click();
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const buttons = await this.addToCartButton.all();
    await buttons[index].click();
  }

  async removeProductFromCartByName(productName: string): Promise<void> {
    const removeLocator = this.page.locator(
      `.inventory_item:has-text("${productName}") button[data-test*="remove"]`,
    );
    await removeLocator.click();
  }

  async getCartItemCount(): Promise<number> {
    const badgeText = (await this.cartBadge.textContent()) ?? "0";
    return parseInt(badgeText, 10);
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async sortProductsBy(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  async getProductDetailsByName(productName: string) {
    const product = this.page.locator(`.inventory_item:has-text("${productName}")`);
    const name = await product.locator(".inventory_item_name").textContent();
    const description = await product.locator(".inventory_item_desc").textContent();
    const price = await product.locator(".inventory_item_price").textContent();

    return { name, description, price };
  }

  async expectToBeLoaded() {
    await expect(this.productContainer).toBeVisible();
  }
}
