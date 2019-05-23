// const xss = require('xss')
const { exec } = require('../db/mysql')

const getList =  () => {
  let sql = `select * from article_list order by id;`

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
