import puppeteer from 'puppeteer'
import loginToFacebook from './login.js'
import getPostLinks from './getPostLinks.js'
import asyncForEach from '@pierreminiggio/async-foreach'
import getPostContent from './getPostContent.js'

/**
 * @typedef {Object} FacebookGroupScraperConfig
 * @property {number} scrollLength default 30000
 * @property {boolean} show default false
 * 
 * @param {string} login
 * @param {string} password
 * @param {FacebookGroupScraperConfig} config 
 */
export default async function (login, password, config = {}) {

    setDefaultConfig(config, 'scrollLength', 30000)
    setDefaultConfig(config, 'show', false)
    
    const browser = await puppeteer.launch({
        headless: ! config.show,
        args: [
            '--disable-notifications'
        ]
    })
    const page = await browser.newPage()

    await loginToFacebook(page, login, password)

    const links = await getPostLinks(page)

    const posts = []
    await asyncForEach(links, async link => {
        posts.push(await getPostContent(page, link))
    })

    posts.forEach(post => {
        console.log(post.author)
        console.log(post.link)
        console.log(post.comments)
    })

    browser.close()
}

/**
 * 
 * @param {FacebookGroupScraperConfig} config 
 * @param {string} configKey 
 * @param {*} defaultValue
 * 
 * @returns void
 */
function setDefaultConfig(config, configKey, defaultValue) {
    if (! (configKey in config)) {
        config[configKey] = defaultValue
    }
}
