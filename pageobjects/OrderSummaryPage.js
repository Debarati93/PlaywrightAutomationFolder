class OrderSummaryPage{

    constructor(page)
    {
        this.page =page;
        this.orderID = this.page.locator("div[class*='col-text']");
        this.orderSummaryHeader = this.page.locator("div[class='email-title']");
    }

    async confirmOrderID()
    {
        await this.orderSummaryHeader.waitFor();
        await this.orderID.waitFor();
        return this.orderID.textContent();
    }
}module.exports={OrderSummaryPage};