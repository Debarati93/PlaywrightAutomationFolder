class OrderListPage 
{
    constructor(page)
    {
        this.page = page;
        this.orderItems = this.page.locator("div li");
        this.checkoutButton = this.page.locator("text=Checkout");
    }

    product(productName)
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