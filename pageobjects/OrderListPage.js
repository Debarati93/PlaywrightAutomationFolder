class OrderListPage 
{
    constructor(page,productName) 
    {
        this.page = page;
        this.orderItems = this.page.locator("div li");
        this.productName = this.page.locator(`h3:has-text('${productName}')`);
        this.checkoutButton = this.page.locator("text=Checkout");
    }

    async navigateToCheckout()
    {
    await this.orderItems.first().waitFor();
    //const bool = await this.productName.isVisible();
    //expect(bool).toBeTruthy();
    await this.checkoutButton.click();
    }
}   
module.exports = {OrderListPage};