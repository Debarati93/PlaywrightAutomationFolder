import {test,expect} from '@playwright/test';
import {customtest} from '../utils_ts/test-base';
import {POManager} from '../pageobjects_typescript/POManager';
import {getPlaywrightCredentials} from '../utils_ts/credentials';

//Json->string->js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));//this is same for both js and ts file. we can use require to import json file in both js and ts file.
//a test case stucture
//javascript is asynchronous.use await to make the steps synchronous,
//also mark the function should be marked with async keyword.
//function do not have any name means an anonymous function should have a symbol like ()=> without function keyword
//fixtures are global variables which are available for all the tests accross your project.
//browser fixture:: this fixture is globally available for each and every project.This fixture is required to invoke the browser.
//context fixture::
for (const data of dataSet) {
  test(`@Web Client App Login - ${data.productName}`, async ({ page }) => {
    const {username, password} = getPlaywrightCredentials();
    console.log(await page.title());
    const pomanager = new POManager(page);
    const loginPage = pomanager.getLoginPage();
    const dashboardPage = pomanager.getDashboardPage();
    const orderListPage = pomanager.getOrderListPage();
    const checkOutPage = pomanager.getCheckoutPage();
    const orderConfirmationPage = pomanager.getOrderConfirmationPage();
    const confirmedOrderListPage = pomanager.getConfirmedOrderListPage();
    const orderSummaryPage = pomanager.getOrderSummaryPage();

    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    await dashboardPage.searchProductAddProduct(data.productName);
    await dashboardPage.navigateToCart();
    await orderListPage.navigateToCheckout();
    await checkOutPage.selectCountry(data.countryNameInitial, data.countryName);
    await expect(checkOutPage.emailLabel).toHaveText(username);
    await checkOutPage.clickSubmit();
    await expect(orderConfirmationPage.headerText).toHaveText(" Thankyou for the order. ");
    const orderID = await orderConfirmationPage.getOrderNumber();
    console.log(orderID);
    await orderConfirmationPage.clickOnMyOrder();
    await confirmedOrderListPage.waitForOrderTable();
    await confirmedOrderListPage.findOrderIDInTheOrderTable(orderID);
    const confirmedOrderID = await orderSummaryPage.confirmOrderID();
    console.log(confirmedOrderID);
    expect(orderID.includes(confirmedOrderID)).toBeTruthy();
  });
}
  customtest(`@Web Client App Login`, async ({ page,testDataForOrder }) => {
    console.log(await page.title());
    const pomanager = new POManager(page);
    const loginPage = pomanager.getLoginPage();
    const dashboardPage = pomanager.getDashboardPage();
    const orderListPage = pomanager.getOrderListPage();
    const checkOutPage = pomanager.getCheckoutPage();
    const orderConfirmationPage = pomanager.getOrderConfirmationPage();
    const confirmedOrderListPage = pomanager.getConfirmedOrderListPage();
    const orderSummaryPage = pomanager.getOrderSummaryPage();

    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    await dashboardPage.searchProductAddProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    await orderListPage.navigateToCheckout();
    await checkOutPage.selectCountry(testDataForOrder.countryNameInitial, testDataForOrder.countryName);
    await expect(checkOutPage.emailLabel).toHaveText(testDataForOrder.username);
    await checkOutPage.clickSubmit();
  });

  //test files will trigger parallel.
  //individual tests in the file will run in sequesnce.
