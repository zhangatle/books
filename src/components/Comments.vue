<template>
  <div class="comments_container">
    <div class="title">评论列表</div>
    <div class="comments_list" v-for="item in list" :key="item.id" @click="handleClick(item)">
      <div class="comments_title">
        <img :src="item.image" alt="" class="img">
        <span class="name">{{item.title}}</span>
        <span class="right">{{item.time}}</span>
      </div>
      <div class="comments_box">
        {{item.comment}}
      </div>
      <span class="right">{{item.phone}}&nbsp;{{item.location}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list', 'type'],
    methods: {
      handleClick (item) {
        if (this.type === 'comments') {
          wx.navigateTo({
            url: '/pages/detail/main?id=' + item.bookid
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comments_container {
    margin: 10px auto;
    padding: 0 3px;
    font-size: 14px;
    .title {
      margin: 10px 0;
    }
    .comments_list {
      margin: 5px 0;
      padding: 5px;
      overflow: hidden;
      border: 1px solid #ddd;
      .comments_title {
        height: 20px;
        line-height: 20px;
        .img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 6px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .comments_box {
        margin: 5px 0;
        background: #fff;
        font-size: 16px;
      }
      .right {
        float: right;
        color: #515151;
        font-size: 12px;
      }
    }
  }
</style>
