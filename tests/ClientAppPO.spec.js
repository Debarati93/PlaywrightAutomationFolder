const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {OrderListPage} = require('../pageobjects/OrderListPage');
const {CheckoutPage} = require('../pageobjects/CheckoutPage');

//a test case stucture
//javascript is asynchronous.use await to make the steps synchronous,
//also mark the function should be marked with async keyword.
//function do not have any name means an anonymous function should have a symbol like ()=> without function keyword
//fixtures are global variables which are available for all the tests accross your project.
//browser fixture:: this fixture is globally available for each and every project.This fixture is required to invoke the browser.
//context fixture::


test.only('ClientApp Login',async({page})=>
{
    console.log(await page.title());
    const emailId = process.env.PLAYWRIGHT_EMAIL;
    const password = process.env.PLAYWRIGHT_PASSWORD;
    if (!emailId || !password) {
        throw new Error('Set PLAYWRIGHT_EMAIL and PLAYWRIGHT_PASSWORD before running this test.');
    }
    const productName = "ZARA COAT 3";
    const countryNameInitial = "ind";
    const countryName = "India";
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const orderListPage = new OrderListPage(page, productName);
    const checkOutPage = new CheckoutPage(page);
    
    await loginPage.goTo();
    await loginPage.validLogin(emailId, password);
    await dashboardPage.searchProductAddProduct(productName);
    await dashboardPage.navigateToCart();
    await orderListPage.navigateToCheckout();
    await checkOutPage.selectCountry(countryNameInitial,countryName);
    await expect(checkOutPage.emailLabel).toHaveText(emailId);
    await checkOutPage.clickSubmit();


    
    await expect (page.locator("h1[class='hero-primary']")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator("td[class='em-spacer-1'] label[class='ng-star-inserted']").textContent();
    console.log(orderID);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tr[class='ng-star-inserted']");
    const rowCount = await rows.count();
    console.log(rowCount);
    for(let i = 0;i < rowCount;i++)
    {
        const rowOrderID =await rows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderID))
        {
            await page.locator("tr[class='ng-star-inserted']").nth(i).locator("button").first().click();
            break;
        }
    }

    const confirmedOrderID = await page.locator("div[class*='col-text']").textContent();
    expect(orderID.includes(confirmedOrderID)).toBeTruthy();
    await page.pause();
})