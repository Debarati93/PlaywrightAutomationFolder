const {test,expect,request} = require('@playwright/test')
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



test("Security test request intercept",async({page})=>
{

    await page.addInitScript(value=>{

        window.localStorage.setItem('token',value);
    },response.token);// Adds a script which would be evaluated. First argument of this method(addInitScript) is a function to inject the token value in the browser,second argument is the value which will be used for the function
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const products = await page.locator(".card-body b");
    await products.first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
        
    )
    //continue method is used to intercept the api request before reaching the server.
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");


})