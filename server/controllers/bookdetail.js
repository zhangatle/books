const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const {id} = ctx.request.query
  // select 查询语句，具体语法参考knex.js
  const detail = await mysql('books').select('books.*', 'cSessionInfo.user_info').join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id').where('id', id).first()
  const info = JSON.parse(detail.user_info)
  let tags = detail.tags.split(',')
  const summary = detail.summary.split('\n')
  // Object的assign方法
  ctx.state.data = Object.assign({}, detail, {
    user_info: {
      nickName: info.nickName,
      image: info.avatarUrl
    },
    tags: tags.sort((a, b) => {
      return a.length - b.length
    }),
    summary
  })
  await mysql('books').where('id', id).increment('count', 1)
}
