class CheckoutPage {
    constructor(page) 
    {
        this.page = page;
        this.countryInput = this.page.locator("input[placeholder='Select Country']");
        this.dropdown = this.page.locator("section[class*='ta-results']");
        this.emailLabel = this.page.locator("div[class='user__name mt-5'] label");
        this.submitButton = this.page.locator("a[class*='action__submit']");

    }

    async selectCountry(countryNameInitial,countryName)
    {
        await this.countryInput.pressSequentially(countryNameInitial);
        await this.dropdown.waitFor();
        const dropdownOptions =await this.dropdown.locator("button");
        const optionsCount = await dropdownOptions.count();
        for(let i=0;i<optionsCount;i++)
        {
        const text = (await dropdownOptions.nth(i).textContent()).trim();
        if(text === countryName)
        {
            await dropdownOptions.nth(i).click();
            break;
        }
    
        }
    }
    async clickSubmit()
    {
        await this.submitButton.waitFor();
        await this.submitButton.click();
    }


}
module.exports = {CheckoutPage};