# SauceDemo Playwright TypeScript

E2E tests for [SauceDemo](https://www.saucedemo.com/) using Playwright + TypeScript.
Covers UI, API, and accessibility testing with a focus on clean architecture.
Page Object Model, Builder pattern for test data, and reusable auth fixtures.

## Tech Stack

Playwright • TypeScript • POM • Builder pattern • Custom auth fixtures • GitHub Actions

## Quick Start

```
npm install
npx playwright install
npm test
```

## Test Coverage

- **Login** — Valid, locked user, invalid credentials
- **Products** — Add/remove cart, sort, list
- **Checkout** — Full purchase flow, multi-item, validation errors
- **Accessibility** — Axe-based checks on key pages
- **API** — GET, POST, PUT, PATCH, DELETE for /posts; includes negative cases

## CI/CD

Runs on GitHub Actions (push/PR to main). Report artifact uploaded on completion.

> ⚠️ CI currently fails due to accessibility violations detected on SauceDemo pages.
