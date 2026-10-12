import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {OrderListPage} from './OrderListPage';
import {CheckoutPage} from './CheckoutPage';
import {OrderConfirmationPage} from './OrderConfirmationPage';
import {ConfirmedOrderListPage} from './ConfirmedOrderListPage';
import {OrderSummaryPage} from './OrderSummaryPage';
import {Page} from '@playwright/test';

export class POManager
{
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    orderListPage: OrderListPage
    checkOutPage: CheckoutPage;
    OrderConfirmationPage: OrderConfirmationPage
    ConfirmedOrderListPage: ConfirmedOrderListPage;
    OrderSummaryPage: OrderSummaryPage;

    constructor(page: any)
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
