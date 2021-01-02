// Copy this file to test.js
// You can then test using npm test

import scrape from './src/scrape.js'

scrape(
    'Facebook login or email',
    'Facebook group password',
    'https://www.facebook.com/groups/[facebook-group]',
    {scrollLength: 3000, show: false}
)
