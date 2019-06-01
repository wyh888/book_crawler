// const xss = require('xss')
const { exec } = require('../db/mysql')

const getList =  async (id) => {
  let sql = `select * from article_list where book_id='${id}' order by article_rank;`

  return await exec(sql)
}

const getContent = async (bookId, articleId) => {
  const sql = `select * from article_detail where book_id='${bookId}' and article_id='${articleId}';`
  return await exec(sql)
}

const getArticleTitle = async (bookId, articleId) => {
  const sql = `select title from article_list where book_id='${bookId}' and article_id='${articleId}';`

  return await exec(sql)
}

module.exports = {
  getList,
  getContent,
  getArticleTitle
}
