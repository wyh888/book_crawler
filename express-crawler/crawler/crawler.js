const async = require('async')
const read = require('../controller/read')
const save = require('../controller/save')
const sendMail = require('./email')
const debug = require('debug')('crawler:run')

module.exports = function() {
  debug('定时爬虫任务开启')
  
  let bookList = []
  let articleList = {}

  async.series([
    // 获取数据库中的书籍列表
    function (done) {
      read.bookList().then((list) => {
        bookList = list
        done()
      })
    },

    // 依次获取所有小说的文章列表
    function (done) {
      async.eachSeries(bookList, function (c, next) {
        read.articleList(c).then((list) => {
          articleList[c.id] = list
          next()
        })
      }, done)
    },

    // 保存文章列表
    function (done) {
      async.eachSeries(Object.keys(articleList), function (id, next) {
        save.articleList(articleList[id], id, next)
      }, done)
    },

    // 重新整理文章列表，把重复的文章去掉
    function (done) {
      debug('整理文章列表，把重复的文章去掉')
      var articles = {}
      Object.keys(articleList).forEach(function (classId) {
        articleList[classId].forEach(function (item) {
          articles[item.article_id] = item
        })
      })

      articleList = []
      Object.keys(articles).forEach(function (id) {
        articleList.push(articles[id])
      })

      done()
    },

    // 依次读取文章的详细内容，并保存
    function (done) {
      async.eachSeries(articleList, function (item, next) {
        save.isArticleExists(item).then((exists) => {
          if (exists) {
            debug('文章已存在：%s', item.title)
            return next()
          }
          
          read.articleDetail(item.url).then((content) => {
            save.articleDetail(item, content).then(() => {
              // let subject = `《${item.book_name}》最新更新章节：${item.title}`
              // sendMail(subject, content)
              next()
            })
          })
        })
      }, done)
    }

  ], function (err) {
    if (err) console.error(err.stack)

    console.log('完成')
    process.exit(0)
  })
}
