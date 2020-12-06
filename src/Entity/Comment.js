import Author from './Author.js'

export default class Comment {
    
    /** @type {Author} */
    author

    /** @type {string} */
    link

    /**
     * @param {Author} author 
     * @param {string} link 
     */
    constructor(author, link) {
        this.author = author
        this.link = link
    }
}
