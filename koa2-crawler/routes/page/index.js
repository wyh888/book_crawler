const router = require('koa-router')()
const { getList } = require('../../controller/book')

router.get('/', async (ctx, next) => {
  const result = await getList()
  await ctx.render('index', {
    title: '小说列表',
    list: result
  })
})

module.exports = router
