import test, { expect } from "@playwright/test";
import fs from 'fs'

test("To upload files", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    // - Upload a document without clicking the Upload button on the page
    await page.locator("//input[@id='file-upload']").setInputFiles("document/Details.txt")
    // - Upload an image inside the red square area
    await page.locator("//input[@id='file-submit']").click()
    // - Assert that the file has been uploaded 
    await expect(page.locator("//div//h3[text()='File Uploaded!']")).toHaveText('File Uploaded!')
})

test("To upload files with event listner", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    // - Upload a document without clicking the Upload button on the page
    const filePromise = page.waitForEvent('filechooser')
    page.locator("//input[@id='file-upload']").click()
    const fileUpload = await filePromise;
    await fileUpload.setFiles(("document/Details.txt"))
    // - Upload an image inside the red square area
    await page.locator("//input[@id='file-submit']").click()
    // - Assert that the file has been uploaded 
    await expect(page.locator("//div//h3[text()='File Uploaded!']")).toHaveText('File Uploaded!')
})

test("To download files", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/download");
    // - Download file.json from the list of files
    const filePromise = page.waitForEvent('download')
    page.getByText("file.json",{exact:true}).click()
    const filedownload = await filePromise;
    await filedownload.saveAs("document/" + filedownload.suggestedFilename())
    // - Assert that the file has been downloaded in the required path
    expect(fs.existsSync("document/" + filedownload.suggestedFilename())).toBe(true);
    
})
