import http from '@/libs/http/index'
const basePath = '/xxxx-admin/'
import userinfo from './mock/login/userinfo.json'
export default {
  userLogin(params: { username: string; password: string; position: string; }) {
    return Promise.resolve({ code: 200, msg: 'success', data: 'xxxxxxxx' })
  },
  sendLoginSms(params: { phone: string }) {
    return Promise.resolve({ code: 200, msg: 'success' })
  },
  logout() {
    return Promise.resolve({ code: 200, msg: 'success' })
  },
  getUserInfo() {
    return Promise.resolve(userinfo)
  },
}
