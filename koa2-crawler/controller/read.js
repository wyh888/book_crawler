const originRequest = require('request')
const cheerio = require('cheerio')
const Entities = require('html-entities').XmlEntities
const { exec } = require('../db/mysql')
const debug = require('debug')('crawler:read')

/**
 * 请求指定URL
 *
 * @param {String} url
 * @param {Function} callback
 */
function request(url, callback) {
  originRequest(url, callback);
}

/**
 * 获取小说列表
 */
exports.bookList = function() {
  debug('获取小说列表')

  const sql = `select * from book_list order by id;`

  return exec(sql)
}

/**
 * 获取小说章节列表
 *
 * @params {String} url
 */
exports.articleList = function (book) {
  debug(`读取章节列表：${book.name} ${book.url}`)

  return new Promise((resolve, reject) => {
    request(book.url, function (err, res) {
      if (err) {
        reject(err)
        return
      }

      // 创建DOM操作对象
      let $ = cheerio.load(res.body.toString())

      // 读取文章列表
      let articleList = []
      $('#list dd a').each(function (index) {
        let $me = $(this)
        let item = {
          title: $me.text().trim(),
          url: 'http://www.xbiquge.la' + $me.attr('href'),
          book_id: book.id,
          book_name: book.name,
          rank: index + 1
        }

        // 从URL中取出文章ID
        let s = item.url.match(/[0-9]\/[0-9]+\/([0-9]+)\.html/)
        if (Array.isArray(s)) {
          item.article_id = s[1]
          articleList.push(item)
        }
      })

      resolve(articleList)
    })
  })
}

/**
 * 获取文章内容
 *
 * @param {String} url
 */

exports.articleDetail = function (url) {
  debug('读取文章内容：%s', url)

  return new Promise((resolve, reject) => {
    request(url, function (err, res) {
      if (err) {
        reject(err)
        return
      }

      // 创建DOM操作对象
      let $ = cheerio.load(res.body.toString())
      let entities = new Entities()

      // 获取文章内容
      let content = entities.decode($('.content_read #content').html().trim()).replace(/\'/g, '')

      // 返回结果
      resolve(content)
    })
  })
}
