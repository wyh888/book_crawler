const express = require('express')
const router = express.Router()
const { getList } = require('../../controller/article')

router.get('/:id', function (req, res, next) {
  const result = getList(req.params.id)
  result.then(list => {
    let title = list[0].book_name
    res.render('article', { title, list })
  })
})

module.exports = router
