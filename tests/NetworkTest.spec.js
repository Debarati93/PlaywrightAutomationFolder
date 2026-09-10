const {test ,expect,request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "dey.debarati066@gmail.com", userPassword: "Welcome@123"};
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;
const fakePayLoadOrders = {data:[],message:"No Orders"};
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


test('Place the order',async({page})=>
{
    
    await page.addInitScript(value=>{

        window.localStorage.setItem('token',value);
    },response.token);// Adds a script which would be evaluated. First argument of this method(addInitScript) is a function to inject the token value in the browser,second argument is the value which will be used for the function
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
      async  route=>{
                    const response =await page.request.fetch(route.request());
                    let body = JSON.stringify(fakePayLoadOrders);
                    route.fulfill(
                        {
                            response,
                            body,
                        }
                    )
                    //intercepting response - api response->(hyjacking by playwright and provide fake response)->browser->render data on frontend


               }
    );
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

    
})