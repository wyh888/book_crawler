const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')
const ENV = process.env.NODE_ENV

// router
const index = require('./routes/page/index')
const article = require('./routes/page/article')
const apiBook = require('./routes/api/book')
const apiArticle = require('./routes/api/article')

// crawler
const scheduleCrawler = require('./crawler/index')
scheduleCrawler()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

if (ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }))
}

// routes
app.use(index.routes(), index.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(apiBook.routes(), apiBook.allowedMethods())
app.use(apiArticle.routes(), apiArticle.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
