import { Page, Locator } from "@playwright/test";

export class NavigationBar {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly menu: Locator;
  readonly logoutLink: Locator;
  readonly resetAppLink: Locator;
  readonly aboutLink: Locator;
  readonly allItemsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.menu = page.locator(".bm-menu-wrap");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.resetAppLink = page.locator("#reset_sidebar_link");
    this.aboutLink = page.locator("#about_sidebar_link");
    this.allItemsLink = page.locator("#inventory_sidebar_link");
  }

  async clickOnCart(): Promise<void> {
    await this.cartIcon.click();
    await this.page.waitForLoadState();
  }

  async getCartBadgeCount(): Promise<number> {
    const badgeText = (await this.cartBadge.textContent()) ?? "0";
    return parseInt(badgeText, 10);
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async closeMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async isMenuOpen(): Promise<boolean> {
    return await this.menu.isVisible();
  }

  async logout(): Promise<void> {
    if (!(await this.isMenuOpen())) {
      await this.openMenu();
    }
    await this.logoutLink.click();
    await this.page.waitForLoadState();
  }

  async resetApp(): Promise<void> {
    if (!(await this.isMenuOpen())) {
      await this.openMenu();
    }
    await this.resetAppLink.click();
    await this.closeMenu();
  }

  async navigateToAllItems(): Promise<void> {
    if (!(await this.isMenuOpen())) {
      await this.openMenu();
    }
    await this.allItemsLink.click();
    await this.page.waitForLoadState();
  }

  async clickAbout(): Promise<void> {
    if (!(await this.isMenuOpen())) {
      await this.openMenu();
    }
    await this.aboutLink.click();
  }
}
