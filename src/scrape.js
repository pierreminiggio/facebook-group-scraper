import puppeteer from 'puppeteer'
import login from './login.js'
import getPostLinks from './getPostLinks.js'
import asyncForEach from '@pierreminiggio/async-foreach'
import getPostContent from './getPostContent.js'

/**
 * @param {boolean} show 
 */
export default async function (show) {
    const browser = await puppeteer.launch({
        headless: ! show,
        args: [
            '--disable-notifications'
        ]
    })
    const page = await browser.newPage()

    await login(page)

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
