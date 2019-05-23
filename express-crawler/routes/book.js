const express = require('express')
const router = express.Router()
const { getList } = require('../controller/book')
const { SuccessModel } = require('../model/resModel')

router.get('/list', (req, res, next) => {
  const result = getList()
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

module.exports = router
