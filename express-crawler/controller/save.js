const async = require('async')
const debug = require('debug')('crawler:save')
const { exec } = require('../db/mysql')

/**
 * 保存文章列表
 *
 * @param {Array} list
 * @param {Function} callback
 */
exports.articleList = function (list, callback) {
  debug('保存文章列表到数据库：%d', list.length)

  // return new Promise((resolve, reject) => {
    
  // })
  async.eachSeries(list, function (item, next) {
    //查询文章是否已存在
    const sql = `
      select * from article_list where id='${item.id}' limit 1;
    `

    exec(sql).then(data => {
      if (Array.isArray(data) && data.length >= 1) {
        // 分类已存在，更新一下
        let updateSql = `
          update article_list set title='${item.title}', url='${item.url}' where id='${item.id}';
        `

        exec(updateSql).then(() => {
          next()
        })
      } else {
        // 分类不存在，添加
        let insertSql = `
          insert into article_list (id, title, url)
          values ('${item.id}', '${item.title}', '${item.url}');
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
exports.articleDetail = function (id, content) {
  debug('保存文章内容: %s', id);

  return new Promise((resolve) => {
    const sql = `select id from article_detail where id='${id}';`

    exec(sql).then((data) => {
      if (Array.isArray(data) && data.length >= 1) {
        let updateSql = `
          update article_detail set content='${content}' where id='${id}';
        `
        exec(updateSql).then(() => {
          resolve()
        })
      } else {
        let insertSql = `
          insert into article_detail (id, content)
          values ('${id}', '${content}');
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
exports.isArticleExists = function (id) {
  return new Promise((resolve, reject) => {
    const sql = `
      select id from article_detail where id='${id}'
    `

    exec(sql).then((data) => {
      resolve(Array.isArray(data) && data.length >= 1)
    })
  })
}