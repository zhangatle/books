<template>
  <div class="rate">
    <div>☆☆☆☆☆</div>
    <div class="show" :style="style">★★★★★</div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: [Number, String],
        default: '0'
      }
    },
    computed: {
      style () {
        return `width:${this.value * 10}%`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rate {
    position: relative;
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    .show {
      position: absolute;
      display: inline-block;
      top: 0;
      left: 0;
      width: 0;
      overflow: hidden;
    }
  }
</style>
