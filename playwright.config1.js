// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries :1,
  workers :3,
  timeout: 30*1000,  //if overall application is slow in this case apply timeout globally
  expect:{
    timeout:30*1000, //if overall application is slow in this case apply timeout globally
  },
  reporter:'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  //To execute based on the Project -> npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js --project=Safari

  projects: [
    {
      name : 'Chromium',
      use: {
        actionTimeout:50*1000, //action timeout has been setup step level for each actions in a test
        navigationTimeout:30*1000,//goto() method will wait for 30 seconds
        browserName : 'chromium',
        headless: false,
        screenshot : 'on',
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
        trace: 'on',
        viewport: {width:720,height:720}
  }

    },
    {
      name : 'Safari',
      use:
      {
        actionTimeout:50*1000, //action timeout has been setup step level for each actions in a test
        navigationTimeout:30*1000,//goto() method will wait for 30 seconds
        browserName : 'webkit',
        headless: false,
        screenshot : 'on',
        trace: 'retain-on-failure',
        ...devices['iPhone 11'],
        video: 'retain-on-failure',

      }
    }
  ]
  ,

});
