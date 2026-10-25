const playwright = require('playwright');
const {POManager} = require('../../pageobjects/POManager');
const {getPlaywrightCredentials} = require('../../utils/credentials');
const {Before,After,BeforeStep,AfterStep,Status} = require("@cucumber/cucumber");

Before({tags: "@foo or @Validations"},async function () {
  const browser =await playwright.chromium.launch({headless:false});
      const context = await browser.newContext();
      this.page = await context.newPage();
      ({username, password} = getPlaywrightCredentials());
      this.username = username;
      this.password = password;
      console.log(await this.page.title());
      //const pomanager = new POManager(this.page);
      this.pomanager = new POManager(this.page); // World constuctor is used to share the page object across the step definitions
});

BeforeStep(function () {
  // perform some shared setup
});

AfterStep(async function ({result}) 
{
  // perform some shared cleanup
  if(result.status === Status.FAILED) 
  {
    await this.page.screenshot({path:'screenshot.png', fullPage: true});
  }
});

After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log("After hook executed");
});