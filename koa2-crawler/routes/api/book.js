const router = require('koa-router')()
const { getList } = require('../../controller/book')
const { SuccessModel } = require('../../model/resModel')

router.prefix('/api/book')

router.get('/list', async (ctx, next) => {
  const result = await getList()
  ctx.body = new SuccessModel(result)
})

module.exports = router
