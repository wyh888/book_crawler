// const xss = require('xss')
const { exec } = require('../db/mysql')

const getList =  (id) => {
  let sql = `select * from article_list where book_id='${id}' order by article_rank;`

  return exec(sql)
}

const getContent = (articleId) => {
  const sql = `select * from article_detail where article_id='${articleId}';`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

module.exports = {
  getList,
  getContent
}
