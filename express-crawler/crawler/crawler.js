const async = require('async')
const config = require('../conf/book')
const read = require('../controller/read')
const save = require('../controller/save')
const debug = require('debug')('crawler:run')

module.exports = function() {
  debug('定时任务开启')
  
  let articleList = {}

  async.series([

    // 依次获取所有文章分类下的文章列表
    function (done) {
      async.eachSeries(config.books, function (c, next) {
        read.articleList(c.url).then((list) => {
          articleList[c.id] = list
          next()
        })
      }, done)
    },

    // 保存文章列表
    function (done) {
      async.eachSeries(Object.keys(articleList), function (id, next) {
        save.articleList(articleList[id], next)
      }, done)
    },

    // 重新整理文章列表，把重复的文章去掉
    function (done) {
      debug('整理文章列表，把重复的文章去掉')
      var articles = {}
      Object.keys(articleList).forEach(function (classId) {
        articleList[classId].forEach(function (item) {
          articles[item.id] = item
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
        save.isArticleExists(item.id).then((exists) => {
          if (exists) {
            debug('文章已存在：%s', item.url)
            return next()
          }
          
          read.articleDetail(item.url).then((content) => {
            save.articleDetail(item.id, content).then(() => {
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
