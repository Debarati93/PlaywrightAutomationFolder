const {Given, When, Then} = require("@cucumber/cucumber");

const {expect} = require('@playwright/test');



Given('a login to Ecommerce application with {string} and {string}',{timeout : 100*1000},async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
    
    const loginPage = this.pomanager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(this.username, this.password);

});

When('Add {string} to cart', async function (productname) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.pomanager.getDashboardPage();
  await this.dashboardPage.searchProductAddProduct(productname);
  await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productname) {
  // Write code here that turns the phrase above into concrete actions
   this.orderListPage = await this.pomanager.getOrderListPage();
  await expect(this.orderListPage.product(productname)).toBeVisible();
});

When('Enter valid detailsand place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
    await this.orderListPage.navigateToCheckout();
    this.checkOutPage = await this.pomanager.getCheckoutPage();
    this.orderConfirmationPage = await this.pomanager.getOrderConfirmationPage();
    this.confirmedOrderListPage = await this.pomanager.getConfirmedOrderListPage();
    this.orderSummaryPage = await this.pomanager.getOrderSummaryPage();
    await this.checkOutPage.selectCountry("ind", "India");
    await expect(this.checkOutPage.emailLabel).toHaveText(this.username);
    await this.checkOutPage.clickSubmit();
    await expect(this.orderConfirmationPage.headerText).toHaveText(" Thankyou for the order. ");
    this.orderID = await this.orderConfirmationPage.getOrderNumber();
    console.log(this.orderID);
});

Then('Verify the order is present in the Order HIstory', async function () {
  // Write code here that turns the phrase above into concrete actions
    await this.orderConfirmationPage.clickOnMyOrder();
    await this.confirmedOrderListPage.waitForOrderTable();
    await this.confirmedOrderListPage.findOrderIDInTheOrderTable(this.orderID);
    const confirmedOrderID = await this.orderSummaryPage.confirmOrderID();
    console.log(confirmedOrderID);
    expect(this.orderID.includes(confirmedOrderID)).toBeTruthy();
});

Given('login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  const usernmelocator = this.page.locator("#username");
  const passwordlocator = this.page.locator("#password");
  const signInbutton = this.page.locator("#signInBtn");  
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  await usernmelocator.fill(username);
  await passwordlocator.fill(password);
  await signInbutton.click();
});

Then('Verify error message is displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("div[style*='block']").textContent());
  await expect(this.page.locator("div[style*='block']")).toContainText('Incorrect');
});

