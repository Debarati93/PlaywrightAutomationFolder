const {test,expect} = require('@playwright/test');

test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});//if the tests are interdependent on each other then use this serial mode so that if one test fail then the rest of the others will not get executed.

test("@Web More Validations",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("displayed-text")).toBeHidden();
    await page.pause();
    page.on('dialog', dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const frame1 = page.frameLocator('#courses-iframe');
    await frame1.locator("li a[href*='lifetime-access']:visible").click();
    const value = await frame1.locator(".text h2").textContent();
    console.log(value.split(' ')[1]);


});

test("@Web Screenshot & Visual comparison",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialscreenshot.png'}); //Partial screenshot
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});// full page screenshot
    await expect(page.locator("displayed-text")).toBeHidden();


})

//Visual Testing

test("@Web Visual testing",async({page})=>
    {

        await page.goto("https://www.flightaware.com/");
        expect(await page.screenshot()).toMatchSnapshot('');
        //On first execution test will fail but it will store the screenshot of the webpage and store it in the repo(MoreValidations.spec.js-snapshots).In the next run it will do the validation.
    }
    )

