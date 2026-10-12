import {Page,Locator} from "@playwright/test";
export class OrderListPage 
{
    page:Page;
    orderItems: Locator;
    checkoutButton: Locator;
    constructor(page:any)
    {
        this.page = page;
        this.orderItems = this.page.locator("div li");
        this.checkoutButton = this.page.locator("text=Checkout");
    }

    product(productName:string)
    {
        return this.page.locator("h3").filter({hasText: productName});
    }

    async navigateToCheckout()
    {
    await this.orderItems.first().waitFor();
    await this.checkoutButton.click();
    }
}   
module.exports = {OrderListPage};