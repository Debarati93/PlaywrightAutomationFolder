const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {OrderListPage} = require('../pageobjects/OrderListPage');
const {CheckoutPage} = require('../pageobjects/CheckoutPage');
const {OrderConfirmationPage} = require('../pageobjects/OrderConfirmationPage');
const {ConfirmedOrderListPage} = require('../pageobjects/ConfirmedOrderListPage');
const {OrderSummaryPage} = require('../pageobjects/OrderSummaryPage');

class POManager
{
    constructor(page)
    {

    this.page=page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.orderListPage = new OrderListPage(this.page);
    this.checkOutPage = new CheckoutPage(this.page);
    this.OrderConfirmationPage = new OrderConfirmationPage(this.page);
    this.ConfirmedOrderListPage = new ConfirmedOrderListPage(this.page);
    this.OrderSummaryPage = new OrderSummaryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getOrderListPage()
    {
        return this.orderListPage;
    }
    getCheckoutPage()
    {
        return this.checkOutPage;
    }
    getOrderConfirmationPage()
    {
        return this.OrderConfirmationPage;
    }
    getConfirmedOrderListPage()
    {
        return this.ConfirmedOrderListPage;
    }
    getOrderSummaryPage()
    {
        return this.OrderSummaryPage;
    }
}
module.exports = {POManager};
