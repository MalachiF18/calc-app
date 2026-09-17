# Calculator

A responsive calculator with addition, subtraction, multiplication, division, decimals, sign toggle, percentages, clear, and keyboard input. Operations are evaluated sequentially like a basic desktop calculator. Division by zero displays Error.

## Run

Requires Node.js 22 or newer.

```sh
npm ci
npm start
```

Open http://127.0.0.1:3000.

## Five browser tests

```sh
npx playwright install chromium
npm test
```

Test source: `tests/calculator.spec.js`. GitHub Actions runs the same five tests and uploads the HTML report and browser screenshots as an artifact on each run.
