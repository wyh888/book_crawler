const express = require('express')
const router = express.Router()
const { getList } = require('../../controller/book')

/* GET home page. */
router.get('/', function(req, res, next) {
  const result = getList()
  result.then(list => {
    res.render('index', { title: '小说列表', list })
  })
})

module.exports = router;
