import {Page,Locator} from "@playwright/test";
export class OrderConfirmationPage{

    page:Page;
    headerText: Locator;
    oderNumber: Locator;
    myorder: Locator;

    constructor(page:any)
    {
        this.page = page;
        this.headerText = this.page.locator("h1[class='hero-primary']");
        this.oderNumber = this.page.locator("td[class='em-spacer-1'] label[class='ng-star-inserted']");
        this.myorder = this.page.locator("button[routerlink*='myorders']");
    }

    async getOrderNumber(): Promise<string>
    {
        const orderNumber = await this.oderNumber.textContent();
        if (orderNumber === null) {
            throw new Error("Order number was not found on the confirmation page.");
        }
        return orderNumber;
    }

    async clickOnMyOrder()
    {
        await this.myorder.click();
    }
}module.exports={OrderConfirmationPage};