// const xss = require('xss')
const { exec } = require('../db/mysql')

const getList =  (id) => {
  let sql = `select * from article_list where book_id='${id}' order by article_rank;`

  return exec(sql)
}

const getContent = (bookId, articleId) => {
  const sql = `select * from article_detail where book_id='${bookId}' and article_id='${articleId}';`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const getArticleTitle = (bookId, articleId) => {
  const sql = `select * from article_list where book_id='${bookId}' and article_id='${articleId}';`

  return exec(sql).then(rows => {
    return rows[0].title
  })
}

module.exports = {
  getList,
  getContent,
  getArticleTitle
}
