const {test,expect} = require('@playwright/test');



//a test case stucture
//javascript is asynchronous.use await to make the steps synchronous,
//also mark the function should be marked with async keyword.
//function do not have any name means an anonymous function should have a symbol like ()=> without function keyword
//fixtures are global variables which are available for all the tests accross your project.
//browser fixture:: this fixture is globally available for each and every project.This fixture is required to invoke the browser.
//context fixture::


test.skip('ClientApp Login',async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    const email = await page.locator("#userEmail");
    const password = await page.locator("#userPassword");
    const login = await page.locator("#login");
    const allTitles = await page.locator(".card-body");
    const products = await page.locator(".card-body b");
    const emailId = "dey.debarati066@gmail.com";
    await email.fill("dey.debarati066@gmail.com");
    await password.fill("Welcome@123");
    await login.click();
    const productName = "ZARA COAT 3";
    //await page.waitForLoadState("networkidle");
    await products.first().waitFor();
    const cardTitles =await allTitles.allTextContents();
    console.log(cardTitles);
    const count =await allTitles.count();
    for(let i=0;i<count;i++)
    {
        if (await allTitles.nth(i).locator("b").textContent()=== productName )
        {
                await allTitles.nth(i).locator("text= Add To Cart").click();
                break;
        }
    }
   
    await page.locator("button[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
    const dropdown = await page.locator("section[class*='ta-results']");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;i++)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator("div[class='user__name mt-5'] label")).toHaveText(emailId);
    await page.locator("a[class*='action__submit']").click();
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