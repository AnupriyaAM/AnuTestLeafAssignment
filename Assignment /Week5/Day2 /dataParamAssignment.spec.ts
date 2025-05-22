import test, { expect, Locator } from "@playwright/test";
import { parse } from "csv-parse/sync";
import fs from 'fs'
import createData from "../../../testData/createLeadData.json"

// validate data using csv

const createLeadData = parse(fs.readFileSync("testData/createLeadData.csv"), {
    columns: true
})

for (let createLead of createLeadData) {
    test(`To validate create lead using data from csv ${createLead.tcId}`, async ({ page }) => {
        let marketingCampaign: Locator;
        let marketingCampaigncount: number;
        await page.goto("http://leaftaps.com/opentaps/control/main");
        // Enter the username and password
        await page.getByLabel("Username").fill(createLead.userName)
        await page.locator("//input[@type='password']").fill(createLead.password)
        // Click Login
        await page.locator("//input[@class='decorativeSubmit']").click()
        // Click CRM/SFA
        await page.locator("//div[@id='button']").click()
        // Click Leads
        await page.locator("//div//a[text()='Leads']").click()
        // Click Create Leads
        await page.locator("//div//ul//li//a[text()='Create Lead']").click()
        // Fill the Company Name,First Name,Last Name,Salutation,Title,Annual Revenue,Department,Phone number
        await page.locator("(//input[@name='companyName'])[2]").fill(createLead.companyName)
        await page.locator("//input[@id='createLeadForm_firstName']").fill(createLead.firstName)
        await page.locator("#createLeadForm_lastName").fill(createLead.lastName)
        await page.locator("//input[@name='personalTitle']").fill(createLead.title)
        // Select Direct Mail from the Source dropdown using label
        await page.selectOption("#createLeadForm_dataSourceId", { label: createLead.sourceData })
        // Select Demo Marketing Campaign from the Marketing Campaign dropdown using value
        // await page.selectOption("#createLeadForm_marketingCampaignId", { index: createLead.marketingCampaignId })
       await page.selectOption("#createLeadForm_marketingCampaignId", { index: 5 })
        // Get the count and print all the values in the Marketing Campaign dropdown
        marketingCampaign = page.locator('#createLeadForm_marketingCampaignId option')
        marketingCampaigncount = await marketingCampaign.count()
        console.log(marketingCampaigncount)
        for (let i = 0; i < marketingCampaigncount; i++) {
            console.log(await marketingCampaign.nth(i).innerText())
        }
        //Select General Services from the Industry dropdown using index
        await page.selectOption("#createLeadForm_industryEnumId", { index: 6 })
        // Select INR from the Preferred Currency dropdown
        await page.selectOption("#createLeadForm_currencyUomId", { label: createLead.currency })
        // Select India from the Country dropdown
        await page.selectOption("#createLeadForm_generalCountryGeoId", { label: createLead.country })
        // Select any state from the State dropdown
        await page.selectOption("#createLeadForm_generalStateProvinceGeoId", { label: createLead.state })
        // Get the count of all states and print the values in the console
        marketingCampaign = page.locator('#createLeadForm_generalStateProvinceGeoId option')
        marketingCampaigncount = await marketingCampaign.count()
        console.log(marketingCampaigncount)
        for (let i = 0; i < marketingCampaigncount; i++) {
            console.log(await marketingCampaign.nth(i).innerText())
        }
        // Click Create Lead
        await page.locator("//input[@name='submitButton']").click()
    })   
}

// validate data using .json

for (let createLData of createData){

 test(`To validate create lead using data from json ${createLData.userName}`, async ({ page }) => {
        let marketingCampaign: Locator;
        let marketingCampaigncount: number;
        await page.goto("http://leaftaps.com/opentaps/control/main");
        // Enter the username and password
        await page.getByLabel("Username").fill(createLData.userName)
        await page.locator("//input[@type='password']").fill(createLData.password)
        // Click Login
        await page.locator("//input[@class='decorativeSubmit']").click()
        // Click CRM/SFA
        await page.locator("//div[@id='button']").click()
        // Click Leads
        await page.locator("//div//a[text()='Leads']").click()
        // Click Create Leads
        await page.locator("//div//ul//li//a[text()='Create Lead']").click()
        // Fill the Company Name,First Name,Last Name,Salutation,Title,Annual Revenue,Department,Phone number
        await page.locator("(//input[@name='companyName'])[2]").fill(createLData.companyName)
        await page.locator("//input[@id='createLeadForm_firstName']").fill(createLData.firstName)
        await page.locator("#createLeadForm_lastName").fill(createLData.lastName)
        await page.locator("//input[@name='personalTitle']").fill(createLData.title)
        // Select Direct Mail from the Source dropdown using label
        await page.selectOption("#createLeadForm_dataSourceId", { label: createLData.sourceData })
        // Select Demo Marketing Campaign from the Marketing Campaign dropdown using value
        // await page.selectOption("#createLeadForm_marketingCampaignId", { index: createLead.marketingCampaignId })
       await page.selectOption("#createLeadForm_marketingCampaignId", { index: 5 })
        // Get the count and print all the values in the Marketing Campaign dropdown
        marketingCampaign = page.locator('#createLeadForm_marketingCampaignId option')
        marketingCampaigncount = await marketingCampaign.count()
        console.log(marketingCampaigncount)
        for (let i = 0; i < marketingCampaigncount; i++) {
            console.log(await marketingCampaign.nth(i).innerText())
        }
        //Select General Services from the Industry dropdown using index
        await page.selectOption("#createLeadForm_industryEnumId", { index: 6 })
        // Select INR from the Preferred Currency dropdown
        await page.selectOption("#createLeadForm_currencyUomId", { label: createLData.currency })
        // Select India from the Country dropdown
        await page.selectOption("#createLeadForm_generalCountryGeoId", { label: createLData.country })
        // Select any state from the State dropdown
        await page.selectOption("#createLeadForm_generalStateProvinceGeoId", { label: createLData.state })
        // Get the count of all states and print the values in the console
        marketingCampaign = page.locator('#createLeadForm_generalStateProvinceGeoId option')
        marketingCampaigncount = await marketingCampaign.count()
        console.log(marketingCampaigncount)
        for (let i = 0; i < marketingCampaigncount; i++) {
            console.log(await marketingCampaign.nth(i).innerText())
        }
        // Click Create Lead
        await page.locator("//input[@name='submitButton']").click()
    })   

}
