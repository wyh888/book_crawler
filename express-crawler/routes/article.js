const express = require('express')
const router = express.Router()
const {
  getList,
  getContent
} = require('../controller/article')
const { SuccessModel } = require('../model/resModel')

router.get('/list', (req, res, next) => {
  const result = getList(req.query.id)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

router.get('/content', (req, res, next) => {
  const result = getContent(req.query.id)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

module.exports = router
