import {Page,Locator} from "@playwright/test";
export class OrderSummaryPage{

    page:Page;
    orderID: Locator;
    orderSummaryHeader: Locator;    
    constructor(page:any)
    {
        this.page =page;
        this.orderID = this.page.locator("div[class*='col-text']");
        this.orderSummaryHeader = this.page.locator("div[class='email-title']");
    }

    async confirmOrderID(): Promise<string>
    {
        await this.orderSummaryHeader.waitFor();
        await this.orderID.waitFor();
        const orderID = await this.orderID.textContent();
        if (orderID === null) {
            throw new Error("Order ID was not found in the order summary.");
        }
        return orderID;
    }
}module.exports={OrderSummaryPage};