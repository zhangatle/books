<template>
  <div class="container">
    <BookInfo :info="bookInfo"></BookInfo>
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
        bookInfo: {}
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
      }
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
    }
  }
</script>

<style scoped>

</style>
