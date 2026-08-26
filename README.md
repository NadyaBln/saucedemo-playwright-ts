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
cp .env.example .env
```

Fill in .env with real SauceDemo test credentials (STANDARD_USER_USERNAME, LOCKED_USER_USERNAME, PROBLEM_USER_USERNAME, PERFORMANCE_GLITCH_USER_USERNAME, USER_PASSWORD), then:

```
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

### Known issue (intentional, not a bug)

The accessibility suite includes a real, reproducible finding: SauceDemo's product sort dropdown (`<select class="product_sort_container">`) has no accessible name — no `<label>`, `aria-label`, or `aria-labelledby` (axe rule [`select-name`](https://dequeuniversity.com/rules/axe/4.11/select-name), WCAG 4.1.2, Section 508). This is an issue on the site itself, not something fixable in this test suite.

The test is marked with Playwright's `test.fail()` so it doesn't break the build, while staying active — if SauceDemo ever fixes this, the test will unexpectedly pass, which Playwright flags for review.
