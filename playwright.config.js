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
  timeout: 30*1000,  //if overall application is slow in this case apply timeout globally
  expect:{
    timeout:30*1000, //if overall application is slow in this case apply timeout globally
  },
  reporter:'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout:50*1000, //action timeout has been setup step level for each actions in a test
    navigationTimeout:30*1000,//goto() method will wait for 30 seconds
    browserName : 'chromium',
    headless: false,
    screenshot : 'on',
    trace: 'on'
  },

  
});

