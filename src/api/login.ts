import encryptor from '@/libs/utils/encryptor';
import loginData from './mock/login/logindata.json'
import userinfo from './mock/login/userinfo.json'
export default {
  userLogin(params: { username: string; password: string; position: string; }) {
    let data = {
      username: params.username,
      password: params.password,
    }
    switch (params.position) {
      case 'admin':
        data = loginData.admin
        break
      case 'front':
        data = loginData.front
        break
      case 'manager':
        data = loginData.manager
        break
      default:
        return Promise.resolve({ code: 500, msg: 'error', data: 'error' })
    }
    if (data.username !== params.username || encryptor.sha256AndBase64(data.password) !== params.password) {
      return Promise.resolve({ code: 500, msg: 'error', data: 'error' })
    } else {
      return Promise.resolve({ code: 200, msg: 'success', data: `${params.position}` })
    }
  },
  logout() {
    return Promise.resolve({ code: 200, msg: 'success' })
  },
  getUserInfo() {
    return Promise.resolve(userinfo)
  },
}
