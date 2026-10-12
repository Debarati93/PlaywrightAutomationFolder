import { expect, type Locator, type Page } from '@playwright/test';

//Typescript checks types durinng development,catching error before you run your code.
let message1 : string ="Hello";
//message1 = 2 ;       //Error: Type 'number' is not assignable to type 'string'.
let age1:number = 20;
let isActive:boolean = true;
let numbers1 :number[] = [1,2,3,4,5];
let data :any = "Hello";  //any type can be assigned to any type of value
data =42;
console.log(data);

function add(a:number,b:number):number
{
    return a+b;
}

//add(3,"4");  //Error: Argument of type 'string' is not assignable to parameter of type 'number'.
add(3,4);

let user:{name:string,age:number}=
{
    name: "Bob",
    age: 30
};
console.log(user);
//user.location = "USA";  //Error: Property 'location' does not exist on type '{ name: string; age: number; }'.
//during compile you will get the error message, but the code will still run and you will get the output as { name: 'Bob', age: 30 }.

let user1:{name:string,age:number,location:string}=
{
    name: "Bob",
    age: 30,
    location: "USA"
};
console.log(user1);

class DashboardPage{

    private page: Page;
    private allTitles: Locator;
    private products: Locator;
    private cartButton: Locator;

    constructor(page:Page)
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