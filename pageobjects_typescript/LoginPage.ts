import {Page,Locator} from "@playwright/test";
export class LoginPage {

    page:Page;
    signInbutton: Locator;
    email: Locator;
    password: Locator;

    constructor(page:any) 
    {
        this.page = page;
        this.signInbutton= page.locator("#login");
        this.email =  page.locator("#userEmail");
        this.password = page.locator("#userPassword");

    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(username:string,password:string)
    {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState("networkidle");
    }

}
module.exports = {LoginPage};