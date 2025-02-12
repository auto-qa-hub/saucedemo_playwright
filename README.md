# Automated tests for saucedemo.com

## Description
This suite of automated tests for the Saucedemo.com website is built using Playwright 🎭, a powerful tool for automating web application testing. The primary goal is to ensure the functionality and stability of the frontend user interface, providing a seamless experience for site visitors.

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: npm install

## Running Tests
- Run all tests: npx playwright test
- Run a specific test: npx playwright test tests/test-name.spec.ts
- Run in UI mode: npx playwright test --ui

## Project Structure

- 📁 **tests/** – Contains all the test files.
  - 📁 **pages/** – Includes page object pattern (POP) files for structuring interactions with pages.
  - 📄 **<test-name>.spec.ts** – Test files.

- ⚙️ **playwright.config.ts** – Playwright configuration file for browser settings and test environment configurations.

- 📁 **fixtures/** – Contains fixtures.
  
- 📁 **utils/** – Utility functions for reusable tasks.
