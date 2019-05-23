const { exec } = require('../db/mysql')

const getList = () => {
  let sql = `select * from book_list order by id;`

  return exec(sql)
}

module.exports = {
  getList
}