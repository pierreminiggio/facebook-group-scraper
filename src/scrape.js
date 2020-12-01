import puppeteer from 'puppeteer'
import login from './login.js'

/**
 * @param {boolean} show 
 */
export default async function (show) {
    const browser = await puppeteer.launch({headless: ! show})
    const page = await browser.newPage()
    await login(page)
}
