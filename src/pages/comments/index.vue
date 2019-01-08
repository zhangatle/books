<template>
  <div class="container">
    <div class="container_box" v-if="userInfo.openId">
      <Comments :list="commentList" type="comments"></Comments>
      <div class="title">我添加的图书</div>
      <BookList v-for="book in books" :key="book.id" :book="book"></BookList>
    </div>
    <div class="info" v-else="userInfo.openId">请先登录</div>
  </div>
</template>

<script>
import Comments from '@/components/Comments'
import BookList from '@/components/BookList'
import {get} from '@/util'
export default {
  data () {
    return {
      commentList: [],
      userInfo: {},
      books: []
    }
  },
  components: {
    Comments,
    BookList
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getComments () {
      const commentList = await get('/weapp/commentList', {openid: this.userInfo.openId})
      this.commentList = commentList.data.list
    },
    async getBooks () {
      const books = await get('/weapp/booklist', {openid: this.userInfo.openId})
      this.books = books.data.list
    }
  },
  onShow () {
    if (!this.userInfo.openId) {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        this.init()
      }
    }
  },
  onPullDownRefresh () {
    wx.showNavigationBarLoading()
    this.init()
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
  }
}
</script>

<style lang="scss" scoped>
  .info {
    width: 94%;
    margin: 0 auto;
    color: #515151;
    font-size: 16px;
    text-align: center;
  }
  .title {
    font-size: 14px;
    margin-left: 4px;
  }
</style>
