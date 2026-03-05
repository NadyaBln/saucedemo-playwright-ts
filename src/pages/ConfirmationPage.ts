import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ConfirmationPage extends BasePage {
  readonly confirmationContainer: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backToProductsButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationContainer = page.locator(".checkout_complete_container");
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async navigateToConfirmation(): Promise<void> {
    await this.goto("/checkout-complete.html");
  }

  async getConfirmationHeaderText(): Promise<string> {
    return (await this.completeHeader.textContent()) || "";
  }

  async getConfirmationMessageText(): Promise<string> {
    return (await this.completeText.textContent()) || "";
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
    await this.page.waitForLoadState();
  }

  async isBackToProductsButtonVisible(): Promise<boolean> {
    return await this.backToProductsButton.isVisible();
  }

  async getOrderConfirmationText(): Promise<string> {
    const header = await this.getConfirmationHeaderText();
    const message = await this.getConfirmationMessageText();
    return `${header} - ${message}`;
  }
}
