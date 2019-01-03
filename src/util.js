// 工具函数库
import config from './config'

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal (text, err) {
  wx.showModal({
    title: text,
    content: err
  })
}

// 封闭ajax请求
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

export function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      url: config.host + url,
      method,
      success (res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}
