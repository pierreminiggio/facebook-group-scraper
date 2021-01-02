# facebook-group-scraper

Prérequis :
Ceux de Puppeteer : https://github.com/puppeteer/puppeteer

Installation :
```
npm install pierreminiggio/facebook-group-scraper
```

Utilisation : 
```javascript
import scraper from '@pierreminiggio/facebook-group-scraper'

const posts = await crawler('Facebook login or email', 'Facebook group password', 'https://www.facebook.com/groups/[facebook-group]')
```
