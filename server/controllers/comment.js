const {mysql} = require('../qcloud')
// 添加评论
module.exports = async (ctx) => {
  const {bookid, comment, openid, location, phone, time} = ctx.request.body
  if (openid && bookid) {
    const findRes = await mysql('comments').select().where('bookid', bookid).where('openid', openid)
    if (findRes.length) {
      ctx.state = {
        code: -2,
        data: {
          msg: '评论已经存在'
        }
      }
    }
  }
  try {
    await mysql('comments').insert({
      bookid,
      comment,
      openid,
      location,
      phone,
      time
    })
    ctx.state.data = {
      msg: '评论成功'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '评论失败：' + e.sqlMessage
      }
    }
  }
}
