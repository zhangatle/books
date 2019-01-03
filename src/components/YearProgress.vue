<template>
  <div class="yearProgress">
    <progress :percent="percent" color="#2d9aa1" />
    <div><b class="imp">{{year}}</b>已经过去了<b class="imp">{{days}}</b>天，<b class="imp">{{percent}}%</b></div>
  </div>
</template>

<script>
  export default {
    name: 'YearProgress',
    data () {
      return {
        time: null
      }
    },
    methods: {
      isLeapYear () {}
    },
    computed: {
      year () {
        return new Date().getFullYear()
      },
      days () {
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        let offset = new Date().getTime() - start.getTime()
        this.time = parseInt(offset / 1000 / 60 / 60 / 24) + 1
        return parseInt(offset / 1000 / 60 / 60 / 24) + 1
      },
      percent () {
        let nowYear = new Date().getFullYear()
        if (nowYear % 4) {
          return (this.days / 366 * 100).toFixed(2)
        } else {
          return (this.days / 365 * 100).toFixed(2)
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
.yearProgress
  width: 100%
  font-size: 16px
  text-align: center
  margin-bottom: 20rpx
  progress
    margin-bottom: 10px
  .imp
    display: inline-block
    color: #DD4E41
    font-weight: bold
</style>
