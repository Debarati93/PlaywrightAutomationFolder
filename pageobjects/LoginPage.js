class LoginPage {

    constructor(page) 
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

    async validLogin(username,password)
    {
        await this.email.fill(username);//"dey.debarati066@gmail.com"
        await this.password.fill(password);//"Welcome@123"
        await this.signInbutton.click();
        await this.page.waitForLoadState("networkidle");
    }

}
module.exports = {LoginPage};