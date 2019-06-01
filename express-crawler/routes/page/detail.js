const express = require('express')
const router = express.Router()
const { getArticleTitle, getContent } = require('../../controller/article')

router.get('/:id/:articleId', function (req, res, next) {
  let { id, articleId } = req.params
  
  getArticleTitle(id, articleId).then(title => {
    const result = getContent(id, articleId)
    result.then(article => {
      res.render('detail', { title, article })
    })
  })
})

module.exports = router
