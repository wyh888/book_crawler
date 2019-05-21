// const xss = require('xss')
const { exec } = require('../db/mysql')

const getList =  () => {
  let sql = `select * from article_list;`

  return exec(sql)
}

const getContent = (id) => {
  const sql = `select * from article_detail where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

module.exports = {
  getList,
  getContent
}
