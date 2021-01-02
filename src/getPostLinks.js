import scroll from '@pierreminiggio/puppeteer-page-scroller'

/**
 * @param {import("puppeteer").Page} page
 * @param {string} groupLink
 * @param {number} scrollLength
 * 
 * @returns {Promise<string[]>}
 */
export default (page, groupLink, scrollLength) => {
    return new Promise(async resolve => {
        await page.goto(groupLink + '/feed')
        await scroll(page, scrollLength)

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
        }, groupLink)

        resolve(links)
    })
}
