import puppeteer from 'puppeteer'
import loginToFacebook from './login.js'
import getPostLinks from './getPostLinks.js'
import asyncForEach from '@pierreminiggio/async-foreach'
import getPostContent from './getPostContent.js'
import Post from './Entity/Post.js'

/**
 * @typedef {Object} FacebookGroupScraperConfig
 * @property {number} scrollLength default 30000
 * @property {boolean} show default false
 * 
 * @param {string} login
 * @param {string} password
 * @param {string} groupLink
 * @param {FacebookGroupScraperConfig} config 
 * 
 * @returns {Post[]}
 */
export default function (login, password, groupLink, config = {}) {

    return new Promise(async (resolve, reject) => {
        setDefaultConfig(config, 'scrollLength', 30000)
        setDefaultConfig(config, 'show', false)

        let browser
        try {
            browser = await puppeteer.launch({
                headless: ! config.show,
                args: [
                    '--disable-notifications'
                ]
            })
        } catch (e) {
            reject(e)
            return
        }
        
        try {
            const page = await browser.newPage()

            await loginToFacebook(page, login, password)

            const links = await getPostLinks(page, groupLink, config.scrollLength)

            const posts = []
            await asyncForEach(links, async link => {
                posts.push(await getPostContent(page, link))
            })

            browser.close()
            resolve(posts)
        } catch (e) {
            browser.close()
            reject(e)
        }
    })
}

/**
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
