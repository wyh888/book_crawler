const router = require('koa-router')()
const { getList, getArticleTitle, getContent } = require('../../controller/article')

router.prefix('/article')

router.get('/:id', async (ctx, next) => {
  const result = await getList(ctx.params.id)
  let title = result[0].book_name
  await ctx.render('article', {
    title,
    list: result
  })
})

router.get('/:id/:articleId', async (ctx, next) => {
  let { id, articleId } = ctx.params
  let title = await getArticleTitle(id, articleId)
  let article = await getContent(id, articleId)
  
  await ctx.render('detail', {
    title: title[0].title,
    article: article[0]
  })
})

module.exports = router
