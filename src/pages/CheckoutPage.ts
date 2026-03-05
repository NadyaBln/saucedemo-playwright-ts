import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  // Locators - Step One
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly pageTitle: Locator;

  // Locators - Step Two
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly backButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    // Step One
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.pageTitle = page.locator('[data-test="title"]');

    // Step Two
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
    this.cartItems = page.locator(".cart_item");
  }

  async navigateToCheckoutStepOne(): Promise<void> {
    await this.goto("/checkout-step-one.html");
  }

  async navigateToCheckoutStepTwo(): Promise<void> {
    await this.goto("/checkout-step-two.html");
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    zipCode: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async continueToStepTwo(): Promise<void> {
    await this.continueButton.click();
    await this.page.waitForLoadState();
  }

  async completeCheckoutStepOne(
    firstName: string,
    lastName: string,
    zipCode: string,
  ): Promise<void> {
    await this.fillCheckoutInformation(firstName, lastName, zipCode);
    await this.continueToStepTwo();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || "";
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
    await this.page.waitForLoadState();
  }

  async getItemTotal(): Promise<string> {
    return (await this.itemTotal.textContent()) || "";
  }

  async getTax(): Promise<string> {
    return (await this.tax.textContent()) || "";
  }

  async getTotal(): Promise<string> {
    return (await this.total.textContent()) || "";
  }
  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForLoadState();
  }

  async goBackFromStepTwo(): Promise<void> {
    await this.backButton.click();
    await this.page.waitForLoadState();
  }

  async isCheckoutStepOneVisible(): Promise<boolean> {
    return await this.firstNameInput.isVisible();
  }

  async isCheckoutStepTwoVisible(): Promise<boolean> {
    return await this.finishButton.isVisible();
  }

  async getCartItemsCountStepTwo(): Promise<number> {
    const items = await this.page.locator(".cart_item").all();
    return items.length;
  }

  async clearFirstName(): Promise<void> {
    await this.firstNameInput.clear();
  }

  async clearLastName(): Promise<void> {
    await this.lastNameInput.clear();
  }

  async clearZipCode(): Promise<void> {
    await this.zipCodeInput.clear();
  }
}
