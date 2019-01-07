<template>
  <div class="container">

  </div>
</template>

<script>
  import {get, post, showSuccess} from '../../util'

  export default {
    data () {
      return {
        bookid: ''
      }
    },
    methods: {
      async getDetail () {
        // 发起ajax请求，传递图书Id,后端count加1
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        console.log(info)
        this.bookinfo = info.data
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
