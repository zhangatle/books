const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const {page, openid, bookName} = ctx.request.query
  const size = 10
  // select 查询语句，具体语法参考knex.js
  const mysqlSelect = mysql('books').select('books.*', 'cSessionInfo.user_info').join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id').orderBy('books.id', 'desc')
  let books
  if (openid) {
    books = await mysqlSelect.where('books.openid', openid)
  } else if (bookName) {
    books = await mysqlSelect.where('title', 'like', `%${bookName}%`)
  } else {
    books = await mysqlSelect.limit(size).offset(Number(page) * size)
  }
  ctx.state.data = {
    list: books.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nickName: info.nickName
        }
      })
    })
  }
}
