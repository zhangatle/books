// 后台链接，开发时使用本地链接，正式上线用正式链接
const host = 'http://192.168.0.123:5757'
const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
}
export default config
