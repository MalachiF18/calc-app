import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }], ['./test-summary-reporter.js']],
  use: { baseURL: 'http://127.0.0.1:3000', screenshot: 'on', trace: 'retain-on-failure' },
  webServer: { command: 'node server.js', url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI }
});
