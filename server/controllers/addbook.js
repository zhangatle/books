// 添加图书
const https = require('https')
// 获取mysql实例
const { mysql } = require('../qcloud')
module.exports = async ctx => {
    const { isbn, openId } = ctx.request.body
    if (isbn && openId) {
        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJson(url)
        // 判断图书是否存在
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已经存在'
                }
            }
            return
        }
        const rate = bookinfo.rating.average
        const { title, image, alt, publisher, summary, price } = bookinfo
        const tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        // 插入Mysql 数据库
        try {
            await mysql('books').insert({ isbn, openId, rate, title, image, alt, publisher, summary, price, tags, author })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败' + e.sqlMessage
                }
            }
        }
    }
}

function getJson (url) {
    return new Promise((resolve, reject) => {
    // 返回的是一个流
        https.get(url, res => {
            let urlData = ''
            // 每次获取新数据都累加
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
