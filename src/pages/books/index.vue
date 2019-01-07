<template>
  <div class="content">
    <SwiperTop :tops="tops"></SwiperTop>
    <BookList v-for="book in books" :key="book.id" :book="book"></BookList>
    <p class="text-bottom" v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
import { get } from '@/util'
import BookList from '@/components/BookList'
import SwiperTop from '@/components/SwiperTop'
export default {
  components: {
    BookList,
    SwiperTop
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: [],
      bookName: ''
    }
  },
  methods: {
    async getList (init = false) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const book = await get('/weapp/booklist', {
        page: this.page,
        bookName: this.bookName
      })
      if (book.code === 0) {
        const moreBooks = book.data.list
        if (moreBooks.length < 10 && this.page > 0) {
          this.more = false
        }
        if (init) {
          wx.stopPullDownRefresh()
          this.books = book.data.list
        } else {
          this.books = this.books.concat(moreBooks)
        }
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.data.list
    }
  },
  mounted () {
    this.getList(true)
    this.getTop()
  },
  onPullDownRefresh () {
    this.getList(true)
  },
  onReachBottom () {
    // 如果还有更多数据
    if (this.more) {
      this.page = this.page + 1
      wx.showNavigationBarLoading()
      this.getList()
      wx.hideNavigationBarLoading()
    }
    return false
  }
}
</script>

<style scoped>
</style>
