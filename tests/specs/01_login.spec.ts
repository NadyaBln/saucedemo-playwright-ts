import { test, expect } from "@playwright/test";
import { TEST_CREDENTIALS, ERROR_MESSAGES } from "../../src/utils/testData";
import { LoginPage } from "../../src/pages/LoginPage";

test.describe("SauceDemo - Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    const productsPage = await loginPage.login(
      TEST_CREDENTIALS.VALID_USER.username,
      TEST_CREDENTIALS.VALID_USER.password,
    );

    await expect(productsPage.productContainer).toBeVisible();
  });

  test("should display error message with locked out user", async ({ page }) => {
    await loginPage.login(
      TEST_CREDENTIALS.LOCKED_USER.username,
      TEST_CREDENTIALS.LOCKED_USER.password,
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(ERROR_MESSAGES.LOCKED_OUT_USER_ERROR);
  });

  test("should show error for invalid credentials", async () => {
    await loginPage.login("invalid_user", "invalid_password");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(ERROR_MESSAGES.INVALID_CREDENTIALS_ERROR);
  });
});
