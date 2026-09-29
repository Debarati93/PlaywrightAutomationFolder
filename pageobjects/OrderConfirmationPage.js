class OrderConfirmationPage{

    constructor(page)
    {
        this.page = page;
        this.headerText = this.page.locator("h1[class='hero-primary']");
        this.oderNumber = this.page.locator("td[class='em-spacer-1'] label[class='ng-star-inserted']");
        this.myorder = this.page.locator("button[routerlink*='myorders']");
    }

    async getOrderNumber()
    {
        return this.oderNumber.textContent();
    }

    async clickOnMyOrder()
    {
        await this.myorder.click();
    }
}module.exports={OrderConfirmationPage};