import Author from './Entity/Author.js'
import Comment from './Entity/Comment.js'
import Post from './Entity/Post.js'

/**
 * @param {import("puppeteer").Page} page
 * @param {string} link
 * 
 * @returns {Promise<Post>}
 */
export default (page, link) => {
    console.log('Scraping ... ' + link)
    return new Promise(async resolve => {
        await page.goto(link)
        const authorSelector = 'h3 a[href^="/groups/"]'
        await page.waitForSelector(authorSelector)

        const scrapedAuthor = await page.evaluate((selector) => {
            const scrapedAuthor = document.querySelector(selector)
            
            return {
                name: scrapedAuthor.innerText,
                link: scrapedAuthor.href.split('?')[0]
            }
        }, authorSelector)

        const postAuthor = new Author(scrapedAuthor.name, scrapedAuthor.link)
        
        const commentSelector = '[aria-label^="Commentaire de "]'
        const commentAuthorSelector = 'a[href^="/groups/"][tabindex="0"]'
        const commentLinkSelector = 'ul>li>a'

        const scrapedComments = await page.evaluate((commentSelector, commentAuthorSelector, commentLinkSelector) => {
            const comments = []
            const scrapedComments = document.querySelectorAll(commentSelector)

            scrapedComments.forEach(scrapedComment => {
                const scrapedAuthor = scrapedComment.querySelector(commentAuthorSelector)
                const scrapedLink = scrapedComment.querySelector(commentLinkSelector)

                if (scrapedAuthor && scrapedLink) {
                    comments.push({
                        authorName: scrapedAuthor.innerText,
                        authorLink: scrapedAuthor.href.split('?')[0],
                        commentLink: scrapedLink.href.split('&')[0]
                    })
                }
            })

            return comments
        }, commentSelector, commentAuthorSelector, commentLinkSelector)

        const comments = []

        scrapedComments.forEach(scrapedComment => {
            comments.push(new Comment(
                new Author(scrapedComment.authorName, scrapedComment.authorLink),
                scrapedComment.commentLink
            ))
        })

        console.log('Scraped !')
        resolve(new Post(postAuthor, link, comments))
    })
}
