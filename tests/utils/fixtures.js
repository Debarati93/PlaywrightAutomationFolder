const base = require('@playwright/test');
const {APIUtils} = require('./APIUtils');
const {request} = require('@playwright/test');
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

const loginPayLoad = {userEmail: "dey.debarati066@gmail.com", userPassword: "Welcome@123"};
let response;

exports.customtest = base.test.extend(
{
    authenticatedPage: async({browser},use)=>
    {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    const email = await page.locator("#userEmail");
    const password = await page.locator("#userPassword");
    const login = await page.locator("#login");
    await email.fill("dey.debarati066@gmail.com");
    await password.fill("Welcome@123");
    await login.click();
    await use(page);
    //tear down code
    await context.close();

    },

    createOrder: async({},use)=>
    {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    response =await apiUtils.createOrder(createOrderPayload);
    await use(response);
    //tear down code
    await apiContext.dispose();
    },
    testDataOrder:{
        productName: "ZARA COAT 3"
    }

})