const async = require('async')
const debug = require('debug')('crawler:save')
const { exec } = require('../db/mysql')

/**
 * 保存文章列表
 *
 * @param {Array} list
 * @param {Function} callback
 */
exports.articleList = function (list, bookId, callback) {
  debug('保存文章列表到数据库：%d', list.length)

  async.eachSeries(list, function (item, next) {
    //查询文章是否已存在
    const sql = `
      select * from article_list where article_id='${item.article_id}' and book_id='${bookId}' limit 1;
    `

    exec(sql).then(data => {
      if (Array.isArray(data) && data.length >= 1) {
        // 分类已存在，更新一下
        let updateSql = `
          update article_list set title='${item.title}', url='${item.url}', article_rank='${item.rank}' where article_id='${item.article_id}' and book_id='${bookId}';
        `

        exec(updateSql).then(() => {
          next()
        })
      } else {
        // 分类不存在，添加
        let insertSql = `
          insert into article_list (article_id, title, url, book_name, book_id, article_rank)
          values ('${item.article_id}', '${item.title}', '${item.url}', '${item.book_name}', '${item.book_id}', ${item.rank});
        `
        exec(insertSql).then(() => {
          next()
        })
      }
    })
  }, callback)
}


/**
 * 保存文章内容
 *
 * @param {String} id
 * @param {String} content
 */
exports.articleDetail = function (article, content) {
  debug('保存文章内容: %s', article.title);

  return new Promise((resolve) => {
    const sql = `select article_id from article_detail where article_id='${article.article_id}' and book_id='${article.book_id}';`

    exec(sql).then((data) => {
      if (Array.isArray(data) && data.length >= 1) {
        let updateSql = `
          update article_detail set content='${content}' where article_id='${articleId}' and book_id='${article.book_id}';
        `
        exec(updateSql).then(() => {
          resolve()
        })
      } else {
        let insertSql = `
          insert into article_detail (article_id, content, book_name, book_id)
          values ('${article.article_id}', '${content}', '${article.book_name}', '${article.book_id}');
        `
        exec(insertSql).then(() => {
          resolve()
        })
      }
    })
  })
}


/**
 * 检查文章是否存在
 *
 * @param {String} id
 * @param {Function} callback
 */
exports.isArticleExists = function (article) {
  return new Promise((resolve) => {
    const sql = `
      select article_id from article_detail where article_id='${article.article_id}' and book_id='${article.book_id}';
    `

    exec(sql).then((data) => {
      resolve(Array.isArray(data) && data.length >= 1)
    })
  })
}