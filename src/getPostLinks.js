import config from '../config.js'
import scroll from '@pierreminiggio/puppeteer-page-scroller'

/**
 * @param {import("puppeteer").Page} page
 * 
 * @returns {Promise<string[]>}
 */
export default (page) => {
    return new Promise(async resolve => {
        await page.goto(config.groupLink + '/feed')
        await scroll(page, config.scrollLength)

        const links = await page.evaluate(groupLink => {
            const links = []
            const scrapedLinks = document.querySelectorAll('a[href^="' + groupLink + '/permalink"]')
            scrapedLinks.forEach(scrapedLink => {
                const split = scrapedLink.href.split('/')
                split.pop()
                const postLink = split.join('/')

                if (! links.includes(postLink)) {
                    links.push(postLink)
                }
            })

            return links
        }, config.groupLink)

        resolve(links)
    })
}
