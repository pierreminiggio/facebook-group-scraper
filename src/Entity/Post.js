import Author from './Author.js'
import Comment from './Comment.js'

export default class Post {
    
    /** @type {Author} */
    author

    /** @type {string} */
    link

    /** @type {Comment[]} */
    comments

    /**
     * @param {Author} author 
     * @param {string} link 
     * @param {Comment[]} comments 
     */
    constructor(author, link, comments) {
        this.author = author
        this.link = link
        this.comments = comments
    }
}
