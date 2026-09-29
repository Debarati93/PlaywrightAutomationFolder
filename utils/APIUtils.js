class APIUtils
{

    constructor(apiContext,loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(createOrderPayload)
    {
      const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
       { 
        data:this.loginPayLoad
       })
      //expect(loginResponse.ok()).toBeTruthy();

       const loginResponseJson =await  loginResponse.json();
       const token = loginResponseJson.token;
       return token;
    }

    async createOrder(createOrderPayload)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse =await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data:createOrderPayload,
                    headers:
                    {
                        'Authorization' :response.token,
                        'Content-type':'application/json'
                    }
                })
        
                const orderResponseJson = await orderResponse.json();
                console.log(orderResponseJson);
                const orderID = orderResponseJson.orders[0];
                response.orderId=orderID;

                return response;
    }
}


module.exports = {APIUtils};
