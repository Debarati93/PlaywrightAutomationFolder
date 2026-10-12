import {test as baseTest} from '@playwright/test';
import {getPlaywrightCredentials} from '../utils_ts/credentials';
interface TestDataForOrder{
    username: string;
    password: string;
    productName: string;
    countryNameInitial: string;
    countryName: string;
}
export const customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
    testDataForOrder: async ({}, use) => {
        await use({
            ...getPlaywrightCredentials(),
            productName: "ZARA COAT 3",
            countryNameInitial: "ind",
            countryName: "India"
        });
    }
});