import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

// 这里设置下拉刷新
export default {
  config: {
    'enablePullDownRefresh': true,
    'onReachBottomDistance': 50
  }
}
