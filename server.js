const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/') {
      app.render(req, res, '/', query)
    } else if (pathname === '/login') {
      app.render(req, res, '/login', query)
    } else if (pathname.match(/\/dashboard\/*/)) {
      app.render(req, res, '/dashboard', {pathname, query})
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(dev ? 3000 : 80, err => {
    if (err) throw err

    if (dev)
      console.log('> Ready on http://localhost:3000')
  })
})
