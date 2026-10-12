import {Page,Locator} from "@playwright/test";
export class ConfirmedOrderListPage
{
    page:Page;
    orderListTable: Locator;
    rows: Locator;
    constructor(page:any)
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

    async findOrderIDInTheOrderTable(orderID:string)
    {
        const rowCount = await this.rows.count();
        console.log(rowCount);
        for(let i = 0;i < rowCount;i++)
        {
            const content = await this.rows.nth(i).locator("th").textContent();
            if (content === null) {
                continue;
            }

            const rowOrderID = content.trim();
            if(orderID.includes(rowOrderID))
            {
            await this.rows.nth(i).locator("button").first().click();
            return;
            }
        }

        throw new Error(`Order ID ${orderID} was not found in the order table`);
    }


}module.exports={ConfirmedOrderListPage};