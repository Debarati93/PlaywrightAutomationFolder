const base = require('@playwright/test');
const {getPlaywrightCredentials} = require('./credentials');

exports.customtest = base.test.extend({
    testDataForOrder: async ({}, use) => {
        await use({
            ...getPlaywrightCredentials(),
            productName: "ZARA COAT 3",
            countryNameInitial: "ind",
            countryName: "India"
        });
    }
});