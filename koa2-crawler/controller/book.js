const { exec } = require('../db/mysql')

const getList = async () => {
  let sql = `select * from book_list order by id;`

  return await exec(sql)
}

module.exports = {
  getList
}
