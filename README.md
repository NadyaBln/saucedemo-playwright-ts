# SauceDemo Playwright TypeScript

E2E tests for [SauceDemo](https://www.saucedemo.com/) using Playwright + TypeScript with Page Object Model.

## Tech Stack

Playwright • TypeScript • POM • Custom auth fixtures • GitHub Actions

## Quick Start

```bash
npm install
npx playwright install
npm test
```

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:debug` | Debug mode |
| `npm run report` | Open HTML report |

## Project Structure

```
src/pages/      → Page objects (Login, Products, Cart, Checkout, etc.)
src/utils/      → Test data, helpers
tests/specs/    → 01_login, 02_products, 03_checkout
tests/fixtures/ → Auth fixture (logged-in state)
```

## Test Coverage

- **Login** — Valid, locked user, invalid credentials
- **Products** — Add/remove cart, sort, list
- **Checkout** — Full purchase flow, multi-item, validation errors

## CI/CD

Runs on GitHub Actions (push/PR to main). Report artifact uploaded on completion.
