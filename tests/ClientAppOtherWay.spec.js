const {test,expect} = require('@playwright/test');



//a test case stucture
//javascript is asynchronous.use await to make the steps synchronous,
//also mark the function should be marked with async keyword.
//function do not have any name means an anonymous function should have a symbol like ()=> without function keyword
//fixtures are global variables which are available for all the tests accross your project.
//browser fixture:: this fixture is globally available for each and every project.This fixture is required to invoke the browser.
//context fixture::


test.only('ClientApp Login',async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    const email = await page.getByPlaceholder("email@example.com");
    const password = await page.getByPlaceholder("enter your passsword");
    const login = await page.getByRole('button',{name:"Login"});
    const emailId = "dey.debarati066@gmail.com";
    await email.fill("dey.debarati066@gmail.com");
    await password.fill("Welcome@123");
    await login.click();
    const allTitles = await page.locator(".card-body");
    await allTitles.filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add To Cart"}).click();
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole('button',{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   
})