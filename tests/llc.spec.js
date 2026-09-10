import {test,expect} from '@playwright/test';


test('Playwright Special Locators',async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Password").fill("abc123");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});
    await page.getByRole("link",{name:"Shop"}).click();
    await expect(page.getByRole("link",{name:"Shop"})).toHaveText("Shop");
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();

});


test('Playwright Test level Timeout',async({page})=>
{
    test.setTimeout(60000); //test level timeouts,all actions of this test will wait for 60 seconds.
    const slowExpect = expect.configure({timeout : 9000}); //Override the default expect and create a customized expect specifically for this test
    page.setDefaultTimeout(9000);//action timeout setup for 9 seconds which overrides the global action timeout time.
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Password").fill("abc123");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000}); // test level timeout
    // Global Timeout -> Test level timeout ->Step level timeout
    await page.getByRole("link",{name:"Shop"}).click({timeout:15000});// override the action time out for this step and it will wait for 15 sec at this step.
    await slowExpect(page.getByRole("link",{name:"Shop"}).first()).toHaveText("Shop");
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
    
});