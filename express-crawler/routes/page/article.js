const express = require('express')
const router = express.Router()
const { getList } = require('../../controller/article')

router.get('/:id', function (req, res, next) {
  const result = getList(req.params.id)
  result.then(list => {
    let name = list[0].book_name
    res.render('article', { name, list })
  })
})

module.exports = router;
