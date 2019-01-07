<template>
  <div class="container">
    <BookInfo :info="bookInfo"></BookInfo>
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
  </div>
</template>

<script>
  import {get, post, showSuccess} from '../../util'
  import BookInfo from '@/components/BookInfo'
  export default {
    components: {
      BookInfo
    },
    data () {
      return {
        bookid: '',
        bookInfo: {},
        location: '',
        phone: ''
      }
    },
    methods: {
      async getDetail () {
        // 发起ajax请求，传递图书Id,后端count加1
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        this.bookInfo = info.data
        wx.setNavigationBarTitle({
          title: this.bookinfo.title
        })
      },
      getPhone (e) {
        if (e.target.value) {
          const phoneInfo = wx.getSystemInfoSync()
          this.phone = phoneInfo.model
        } else {
          this.phone = ''
        }
      },
      getLoc (e) {
        const ak = 't4QRSgpPVuta6KdYkrtZp2u3jhnxnarI'
        const url = 'http://api.map.baidu.com/geocoder/v2/'
        const that = this
        if (e.target.value) {
          wx.getLocation({
            success (geo) {
              console.log(geo)
              wx.request({
                url,
                data: {
                  ak,
                  location: `${geo.latitude},${geo.longitude}`,
                  output: 'json'
                },
                success (res) {
                  if (res.data.status === 0) {
                    console.log(res.data)
                    that.location = res.data.result.addressComponent.city
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
      },
      onShareAppMessage: function (res) {
        if (res.from === 'button') {
          console.log(res.target)
        }
        return {
          title: '自定义转发标题'
        }
      }
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
    },
    onShareAppMessage (res) {
      console.log(res.target)
      return {
        title: this.bookInfo.title
      }
    }
  }
</script>

<style scoped>

</style>
