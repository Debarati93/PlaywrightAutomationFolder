import {Page,Locator} from "@playwright/test";
export class DashboardPage{

    page:Page;
    allTitles: Locator;
    products: Locator;
    cartButton: Locator;        
    constructor(page:any)
    {
    this.page = page;
    this.allTitles = page.locator(".card-body");
    this.products =  page.locator(".card-body b");
    this.cartButton = page.locator("button[routerlink*='cart']");
    }

    async searchProductAddProduct(productName:string)
    {
        await this.products.first().waitFor();
        const cardTitles =await this.allTitles.allTextContents();
        console.log(cardTitles);
        const count =await this.allTitles.count();
        for(let i=0;i<count;i++)
        {
            if (await this.allTitles.nth(i).locator("b").textContent()=== productName )
            {
                        await this.allTitles.nth(i).locator("text= Add To Cart").click();
                        break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cartButton.click();
    }
}
module.exports = {DashboardPage};