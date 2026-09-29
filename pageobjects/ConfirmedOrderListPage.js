class ConfirmedOrderListPage
{

    constructor(page)
    {
        this.page=page;
        this.orderListTable = this.page.locator("tbody");
        this.rows = this.page.locator("tr[class='ng-star-inserted']");
    }

    async waitForOrderTable()
    {
        await this.orderListTable.waitFor();
        await this.rows.first().waitFor();
    }

    async findOrderIDInTheOrderTable(orderID)
    {
        const rowCount = await this.rows.count();
        console.log(rowCount);
        for(let i = 0;i < rowCount;i++)
        {
            const rowOrderID = (await this.rows.nth(i).locator("th").textContent()).trim();
            if(orderID.includes(rowOrderID))
            {
            await this.rows.nth(i).locator("button").first().click();
            return;
            }
        }

        throw new Error(`Order ID ${orderID} was not found in the order table`);
    }


}module.exports={ConfirmedOrderListPage};