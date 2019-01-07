<template>
  <div class="bookinfo">
    <div class="thumb">
      <img :src="info.image" mode="aspectFill" alt="" class="back">
      <img :src="info.image" mode="aspectFit" alt="" class="img">
      <div class="title_info">
        <p class="title">《{{info.title}}》</p>
        <p class="author">{{info.author}}</p>
      </div>
    </div>
    <div class="subTitle_info">
      <div class="detail">
        <img :src="userInfo.image" alt="" class="avatar">
        {{userInfo.nickName}}
        <div class="right text-primary">
          <span class="rate">{{info.rate}}分</span>
          <Rate :value="info.rate"></Rate>
        </div>
      </div>
      <div class="detail">
        {{info.publisher}}
        <div class="right price">
          ￥{{info.price}}
        </div>
      </div>
    </div>
    <div class="tags">
      <div class="tags_badge" :key="tag" v-for="tag in info.tags">
        {{tag}}
      </div>
    </div>
    <div class="summary">
      <div class="summary_badge" :key="index" v-for="(item ,index) in info.summary">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
  import Rate from '@/components/Rate'
  export default {
    components: {
      Rate
    },
    props: ['info'],
    computed: {
      userInfo () {
        return this.info.user_info || {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bookinfo {
    font-size: 14px;
    .thumb {
      overflow: hidden;
      width: 750rpx;
      height: 500rpx;
      position: relative;
      .back {
        filter:blur(5px);
        display: block;
        width: 100%;
        opacity: 0.5;
      }
      .img, .title_info {
        position: absolute;
        left: 0;
        right: 0;
        top: -30px;
        margin: auto;
        width: 200rpx;
        color: #fff;
      }
      .title_info {
        top: 330rpx;
        width: 100%;
        text-align: center;
        .author {
          font-size: 14px;
        }
      }
    }
    .subTitle_info {
      padding: 6px 10px;
      .detail {
        .avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .right {
          float: right;
        }
      }
    }
    .tags {
      margin-left: 5px;
      font-size: 14px;
      .tags_badge {
        display: inline-block;
        word-break: break-all;
        border: 1px solid #DD4E41;
        border-radius: 4px;
        color: #DD4E41;
        margin: 4px;
        padding: 2px;
      }
    }
    .summary {
      padding: 6px 10px;
      text-indent: 2em;
      color: #515151
    }
  }
</style>
