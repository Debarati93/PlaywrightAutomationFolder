const {test ,expect,request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');


const loginPayLoad = {userEmail: "dey.debarati066@gmail.com", userPassword: "Welcome@123"};
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    response =await apiUtils.createOrder(createOrderPayload);
}
);  //will execute before all the tests only once

test.beforeEach(()=>
{


}); //will execute before each tests 


test('@API Place the order',async({page})=>
{
    
    await page.addInitScript(value=>{

        window.localStorage.setItem('token',value);
    },response.token);// Adds a script which would be evaluated. First argument of this method(addInitScript) is a function to inject the token value in the browser,second argument is the value which will be used for the function
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const allTitles = await page.locator(".card-body");
    const products = await page.locator(".card-body b");
    const emailId = "dey.debarati066@gmail.com";
    const productName = "ZARA COAT 3";
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tr[class='ng-star-inserted']");
    const rowCount = await rows.count();
    console.log(rowCount);
    for(let i = 0;i < rowCount;i++)
    {
        const rowOrderID =await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderID))
        {
            await page.locator("tr[class='ng-star-inserted']").nth(i).locator("button").first().click();
            break;
        }
    }

    const confirmedOrderID = await page.locator("div[class*='col-text']").textContent();
    expect(response.orderId.includes(confirmedOrderID)).toBeTruthy();
    await page.pause();

})