<template>
  <div class="container">
    <BookInfo :info="bookInfo"></BookInfo>
    <Comments :list="commentList" v-if="commentList.length"></Comments>
    <textarea v-model="comment" v-if="showAdd" class="textarea" :maxlength="100" placeholder="请输入对书的评价"></textarea>
    <div class="switch">
      <div class="location">
        地理位置：
        <switch class="checkbox" @change="getLoc" :checked="location" color="#DD4E41"></switch>
        <span>{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
        <switch class="checkbox" @change="getPhone" :checked="phone" color="#DD4E41"></switch>
        <span>{{phone}}</span>
      </div>
    </div>
    <button class="btn" @click="addComment" v-if="showAdd">评论</button>
    <button class="btn" open-type="share">分享</button>
  </div>
</template>

<script>
  import {get, post, showSuccess} from '../../util'
  import BookInfo from '@/components/BookInfo'
  import Comments from '@/components/Comments'
  export default {
    components: {
      BookInfo,
      Comments
    },
    data () {
      return {
        bookid: '',
        bookInfo: {},
        location: '',
        comment: '',
        phone: '',
        userInfo: {},
        commentList: []
      }
    },
    methods: {
      // 获取评论
      async getComment () {
        // 获取评论列表
        const comments = await get('/weapp/commentList', {bookid: this.bookid})
        this.commentList = comments.data.list || []
      },
      // 添加评论
      async addComment () {
        const data = {
          comment: this.comment,
          phone: this.phone,
          location: this.location,
          bookid: this.bookid,
          openid: this.userInfo.openId,
          time: this.getNow()
        }
        try {
          const res = await post('/weapp/comment', data)
          showSuccess(res.data.msg)
          this.comment = ''
          this.getComment()
        } catch (e) {
          console.log(e)
        }
      },
      // 获取当前时间
      getNow () {
        const d = new Date()
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let day = d.getDate()
        let hour = d.getHours()
        let min = d.getMinutes()
        let arr = this.dateFormate([month, day, hour, min])
        let time = `${year}-${arr[0]}-${arr[1]}-${arr[2]}:${arr[3]}`
        return time
      },
      // 时间格式化
      dateFormate (arr) {
        return arr.map((t) => {
          return String(t).length < 2 ? '0' + t : t
        })
      },
      // 获取图书详情
      async getDetail () {
        // 发起ajax请求，传递图书Id,后端count加1
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        this.bookInfo = info.data
        wx.setNavigationBarTitle({
          title: this.bookinfo.title
        })
      },
      // 获取手机型号，如果是iPhone机型，则要进行截取
      getPhone (e) {
        if (e.target.value) {
          const phoneInfo = wx.getSystemInfoSync()
          console.log(phoneInfo)
          if (phoneInfo.brand === 'iPhone') {
            this.phone = phoneInfo.model.split(' (')[0]
          } else {
            this.phone = phoneInfo.model
          }
        } else {
          this.phone = ''
        }
      },
      // 获取地理位置，需要百度接口，申请ak
      getLoc (e) {
        const ak = 't4QRSgpPVuta6KdYkrtZp2u3jhnxnarI' // 请求ak
        const url = 'http://api.map.baidu.com/geocoder/v2/' // 请求Url
        const that = this
        if (e.target.value) {
          wx.getLocation({
            success (geo) {
              wx.request({
                url,
                data: {
                  ak,
                  location: `${geo.latitude},${geo.longitude}`,
                  output: 'json'
                },
                success (res) {
                  if (res.data.status === 0) {
                    that.location = res.data.result.addressComponent.province + res.data.result.addressComponent.city
                  } else {
                    that.location = '未知'
                  }
                }
              })
            }
          })
        } else {
          this.location = ''
        }
      }
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComment()
      this.getNow()
      const userInfo = wx.getStorageSync('userInfo')
      this.userInfo = userInfo
      this.comment = ''
    },
    computed: {
      showAdd () {
        if (!this.userInfo.openId) {
          return false
        }
        // 一个用户对一本书只允许评论一条
        if (this.commentList.filter(v => v.openid === this.userInfo.openId).length) {
          return false
        }
        return true
      }
    },
    // 用户分享
    onShareAppMessage () {
      return {
        title: this.bookInfo.title
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    font-size: 14px;
    .textarea {
      margin: 0 auto;
      padding: 10px 8px;
      width: 94%;
      height: 50px;
      background: #fafafa;
      color: #222;
    }
    .showAdd {
      color: #515151;
      width: 94%;
      margin: 0 auto;
    }
    .btn {
      margin-top: 10px;
      margin-bottom: 0;
    }
    .switch {
      margin: 10px auto;
      width: 94%;
      font-size: 12px;
      switch {
        zoom: 0.6;
      }
      span {
        color: #DD4E41;
      }
      .phone {
        margin-top: 4px;
      }
    }
  }
</style>
