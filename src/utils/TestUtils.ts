import { Page } from "@playwright/test";

export class TestUtils {
  static getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  static generateRandomString(length: number = 10): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomEmail(): string {
    return `test${this.generateRandomString(8)}@example.com`;
  }

  //Extract number from string (e.g., "$29.99" -> 29.99)
  static extractPrice(priceString: string): number {
    const match = priceString.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  static calculatePriceSum(prices: string[]): number {
    return prices.reduce((sum, price) => sum + this.extractPrice(price), 0);
  }

  static formatToCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  // Compare two prices with tolerance for floating point errors
  static comparePrices(price1: string, price2: string, tolerance: number = 0.01): boolean {
    const num1 = this.extractPrice(price1);
    const num2 = this.extractPrice(price2);
    return Math.abs(num1 - num2) <= tolerance;
  }

  static async getPageConsoleMessages(page: Page): Promise<string[]> {
    const messages: string[] = [];

    page.on("console", (msg) => {
      messages.push(msg.text());
    });

    return messages;
  }

  static setupAlertHandler(page: Page, autoAccept: boolean = true): void {
    page.on("dialog", async (dialog) => {
      console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
      if (autoAccept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  static getUrlParameter(url: string, param: string): string | null {
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
  }

  static areAllEqual<T>(array: T[]): boolean {
    return array.every((val) => val === array[0]);
  }

  static removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  static sortPrices(prices: string[], ascending: boolean = true): string[] {
    return [...prices].sort((a, b) => {
      const numA = this.extractPrice(a);
      const numB = this.extractPrice(b);
      return ascending ? numA - numB : numB - numA;
    });
  }
}
