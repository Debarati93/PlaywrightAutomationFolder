const {test,expect} = require('@playwright/test');

//a test case stucture
//javascript is asynchronous.use await to make the steps synchronous,
//also mark the function should be marked with async keyword.
//function do not have any name means an anonymous function should have a symbol like ()=> without function keyword
//fixtures are global variables which are available for all the tests accross your project.
//browser fixture:: this fixture is globally available for each and every project.This fixture is required to invoke the browser.
//context fixture::
test('First Playwright test',async ({browser})=>
{
    
    const context =await browser.newContext();
    //newContext():: creates a fresh instance of browser.As a parameter of this function we can provide the required proxy or cookie information.
    const page = await context.newPage();
    const username = page.locator("#username");
    const password = page.locator("#password");
    const signInbutton = page.locator("#signInBtn");
    const cardTitles= page.locator("div.card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await username.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signInbutton.click();
    console.log(await page.locator("div[style*='block']").textContent());
    await expect(page.locator("div[style*='block']")).toContainText('Incorrect');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signInbutton.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

//page fixture:: if you do not have anything to inject in the new browser instance then a default page will get created.IN this case no need of browser or context.
test('Second Playwright test',async ({page})=>
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");


});

test('UI controls',async({page})=>
{
    const username = page.locator("#username");
    const password = page.locator("#password");
    const signInbutton = page.locator("#signInBtn");
    const dropdownvalues = page.locator("select.form-control");
    const radiobutton = page.locator("label.customradio");
    const okaybutton = page.locator("#okayBtn");
    const checkbox = page.locator("#terms");
    const link = page.locator("a[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await dropdownvalues.selectOption("Consultant");
    await radiobutton.last().click();
    await okaybutton.click();
    console.log(await radiobutton.last().isChecked());
    await expect(radiobutton.last()).toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy();
    await expect(link).toHaveAttribute("class","blinkingText");
    

})

test("Child window handle",async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const link = page.locator("a[href*='documents-request']");
    //if we need some steps to execute asynchronously then we need to keep the steps inside a promise array and wait till all the promises will be fulfilled.
    //promises have three states- pending,rejected,fulfilled.
    //here only the context.waitForEvent('page') will return a new page that's why kept const[newPage] as a return of this promise.If you see multiple pages are opening then you should provide const[newPage,newPage2,......].
    const[newPage]=await Promise.all(
    [ context.waitForEvent('page'),//this will listen for any new page.
    await link.click(),])

    const text = await newPage.locator(".red").textContent();
    const arraytext = text.split("@");
    const domain = arraytext[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
    

})

test('UI Controls',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("#password");
    const selectDropdown = page.locator('select.form-control');
    const signInbutton = page.locator("#signInBtn");
    const documentLink = page.locator("a[href*='documents-request']");
    await username.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await selectDropdown.selectOption("Consultant");
    //await page.pause();
    await page.locator("label.customradio").last().click();
    await page.locator('button#okayBtn').click();
    console.log(await page.locator("label.customradio").last().isChecked());
    await expect(page.locator("label.customradio").last()).toBeChecked();
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await page.locator("#terms").check();
    await expect(documentLink).toHaveAttribute('class','blinkingText')

})

test.only('Handle windows',async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("a[href*='documents-request']");
    const [newPage] =await Promise.all(
    [ 
        context.waitForEvent('page'),
        documentLink.click(),
     
    ])
     
    const text =await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());

})








