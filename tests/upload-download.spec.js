const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test');
//Using promise
// const workbook = new ExcelJs.Workbook();
// workbook.xlsx.readFile('C:\\Users\\deban\\Downloads\\download.xlsx').then(function()
// {

//     const worksheet = workbook.getWorksheet('Sheet1');
//     worksheet.eachRow((row, rowNumber) => {

//     row.eachCell((cell,cellNumber) => {
//         // Process each cell
//         console.log(cell.value);
//     })


//     })

// })

//Using async method
async function writeExcelFile(searchText,replacetext,change,filePath){

const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath);
    let rowNumber, cellNumber;
    
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcelFile(worksheet, searchText);

    // Make sure we found the cell before trying to update it
    if (output.row === -1 || output.column === -1) {
        console.error(`Value "${searchText}" not found in the worksheet. No changes made.`);
        return;
    }

    // Use getRow(...).getCell(...) to fetch by numeric indices
    const cell1 = worksheet.getRow(output.row).getCell(output.column);
    const cell2 = worksheet.getRow(output.row).getCell(output.column+change.colChange);
    cell1.value = replacetext;
    cell2.value = "299";

    await workbook.xlsx.writeFile(filePath);
}



async function readExcelFile(worksheet,searchText) {

    let output = {row: -1,column: -1};
    worksheet.eachRow((row, rowNumber) => {

    row.eachCell((cell,cellNumber) => {
        if(cell.value===searchText)
        {
            output.row = rowNumber;
            output.column = cellNumber;
            console.log("row: " + rowNumber + ", cell: " + cellNumber);
        }
    })


    })

    return output;
}

//writeExcelFile("Apple", "Iphone",{rowChange:0,colChange:2}, "C:\\Users\\deban\\Downloads\\download.xlsx");

test("upload doownload excel validation",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button",{name:"Download"}).click();
    const download = await downloadPromise;
    const downloadPath = "C:\\Users\\deban\\Downloads\\download.xlsx";
    // Ensure the downloaded file is saved to the expected path before trying to read it
    await download.saveAs(downloadPath);
    await writeExcelFile("Apple", "Iphone",{rowChange:0,colChange:2}, downloadPath);
    await page.locator("#fileinput").setInputFiles("C:\\Users\\deban\\Downloads\\download.xlsx");
    const replacedText = await page.getByText("Iphone");
    const desiredRow = await page.getByRole("row").filter({has: replacedText});
    console.log(await desiredRow.locator("#cell-4-undefined").textContent());
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText("299");

})