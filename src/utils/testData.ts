import * as dotenv from "dotenv";
dotenv.config();

interface Credentials {
  username: string;
  password: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Environment variable "${name}" is not set`);
  return value;
}

export const TEST_CREDENTIALS: Record<string, Credentials> = {
  VALID_USER: {
    username: requireEnv("STANDARD_USER_USERNAME"),
    password: requireEnv("USER_PASSWORD"),
  },
  LOCKED_USER: {
    username: requireEnv("LOCKED_USER_USERNAME"),
    password: requireEnv("USER_PASSWORD"),
  },
  PROBLEM_USER: {
    username: requireEnv("PROBLEM_USER_USERNAME"),
    password: requireEnv("USER_PASSWORD"),
  },
  PERFORMANCE_GLITCH_USER: {
    username: requireEnv("PERFORMANCE_GLITCH_USER_USERNAME"),
    password: requireEnv("USER_PASSWORD"),
  },
};

export const CHECKOUT_INFO = {
  VALID_INFO: {
    firstName: "John",
    lastName: "Doe",
    zipCode: "12345",
  },
  ANOTHER_INFO: {
    firstName: "Jane",
    lastName: "Smith",
    zipCode: "54321",
  },
};

export const SORT_OPTIONS = {
  A_TO_Z: "az",
  Z_TO_A: "za",
  LOW_TO_HIGH: "lohi",
  HIGH_TO_LOW: "hilo",
};

export const PRODUCT_NAMES = {
  BACKPACK: "Sauce Labs Backpack",
  BIKE_LIGHT: "Sauce Labs Bike Light",
  BOLT_TSHIRT: "Sauce Labs Bolt T-Shirt",
  FLEECE_JACKET: "Sauce Labs Fleece Jacket",
  ONESIE: "Sauce Labs Onesie",
  RED_TSHIRT: "Test.allTheThings() T-Shirt (Red)",
};

export const URLS = {
  BASE_URL: "https://www.saucedemo.com",
  LOGIN: "/",
  INVENTORY: "/inventory.html",
  CART: "/cart.html",
  CHECKOUT_ONE: "/checkout-step-one.html",
  CHECKOUT_TWO: "/checkout-step-two.html",
  CHECKOUT_COMPLETE: "/checkout-complete.html",
};

export const ERROR_MESSAGES = {
  LOCKED_OUT_USER_ERROR: "Epic sadface: Sorry, this user has been locked out.",
  REQUIRED_FIELDS_ERROR: "Error: Username is required",
  INVALID_CREDENTIALS_ERROR:
    "Epic sadface: Username and password do not match any user in this service",
};

export const SUCCESS_MESSAGES = {
  ORDER_COMPLETE: "Thank you for your order!",
  ORDER_DISPATCHED:
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
};
