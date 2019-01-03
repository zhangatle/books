<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button class="btn" v-if="!userInfo.openId" lang="zh_CN" open-type="getUserInfo" @getuserinfo="login">登录</button>
    <button @click="scanBook" class="btn" v-show="userInfo.openId">添加图书</button>
  </div>
</template>

<script>
import {showSuccess, showModal, post} from '@/util'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import YearProgress from '@/components/YearProgress'
export default {
  components: {YearProgress},
  data () {
    return {
      userInfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: 'doge'
      }
    }
  },
  methods: {
    login () {
      const session = qcloud.Session.get()
      console.log(session)
      console.log(wx.getStorageSync('userInfo'))
      if (session) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.loginWithCode({
          success: res => {
            this.userInfo = wx.getStorageSync('userInfo')
          },
          fail: err => {
            showModal('登录错误', err.message)
          }
        })
      } else {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: res => {
            wx.setStorageSync('userInfo', res)
            this.userInfo = wx.getStorageSync('userInfo')
            showSuccess('登录成功')
          },
          fail: err => {
            showModal('登录错误', err.message)
          }
        })
      }
    },
    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openId: this.userInfo.openId
      })
      if (res.code === 0 && res.data.title) {
        showSuccess(`${res.data.title}添加成功`)
      }
    },
    scanBook () {
      wx.scanCode({
        success: res => {
          if (res.result) {
            console.log(res)
            this.addBook(res.result)
          }
        }
      })
    }
  },
  created () {
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
  }
}
</script>

<style lang="sass" scoped>
  .container
    padding: 0 30px
    .userinfo
      margin-top: 10rpx
      text-align: center
      margin-bottom: 40rpx
      img
        width: 150rpx
        height: 150rpx
        border-radius: 50%
        margin: 20rpx
</style>
