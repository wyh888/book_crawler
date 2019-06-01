const router = require('koa-router')()
const {
  getList,
  getContent
} = require('../../controller/article')
const { SuccessModel } = require('../../model/resModel')

router.prefix('/api/article')

router.get('/list', async (ctx, next) => {
  const result = await getList(ctx.query.id)
  ctx.body = new SuccessModel(result)
})

router.get('/content', async (ctx, next) => {
  const { bookId, articleId } = ctx.query
  const result = await getContent(bookId, articleId)

  ctx.body = new SuccessModel(result[0])
})

module.exports = router
