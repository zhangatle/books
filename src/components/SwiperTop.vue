<template>
  <div class="swiper">
    <swiper indicator-dots=true indicator-color="#fff" indicator-active-color="#DD4E41" autoplay=true interval=5000 duration=500 circular=true>
      <div v-for="(item, myindex) in imgUrls" :key="myindex">
        <swiper-item class="swiper-item">
          <div class="slide-image" v-for="img in item" :key="img.id">
            <img :src="img.image" mode="aspectFit" @click="bookDetail(img)">
          </div>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: ['tops'],
    computed: {
      imgUrls () {
        let res = this.tops
        return [res.slice(0, 3), res.slice(3, 6), res.slice(6, 9)]
      }
    },
    methods: {
      bookDetail (img) {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + img.id
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper{
    margin-top: 5px;
    .swiper-item {
      display: flex;
      .slide-image {
        flex: 1
      }
      img {
        width: 100%;
        height: 140px;
      }
    }
  }
</style>
