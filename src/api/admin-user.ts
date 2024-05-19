// import http from '@/libs/http/index'
// const basePath = '/xxxx-admin/'

import userList from './mock/aircondition.json'
import userDetail from './mock/admin/user-detail.json'
//主要为后台管理用户提供接口
export default {
  getUserList(params: { room?: string; mode?: string; speed?: string; temperature?: string; onlineStatus?: string; }) {
    return Promise.resolve(userList)
  },
  getUserDetail(userId?: string) {
    return Promise.resolve(userDetail)
  },
  addUser(params: {
    room: string;
    mode: string;
    speed: number;
    temperature: number;
    onlineStatus: string;
  }) {
    return Promise.resolve({ code: 200, msg: 'success', data: {} })
  },
  updateUser(params: {
    room: string;
    mode: string;
    speed: number;
    temperature: number;
    onlineStatus: string;
  }) {
    return Promise.resolve({ code: 200, msg: 'success', data: {} })
  },
  updateUserStatus(params: { room: string; state: number }) {
    return Promise.resolve({ code: 200, msg: 'success', data: {} })
  },

  // getUserRoleList(userId: string) {
  //   return Promise.resolve(userRoleList)
  // },
  // setUserRole(userId: string, roleidList: any[]) {
  //   return Promise.resolve({ code: 200, msg: 'success', data: {} })
  // },

  resetPassword(userId: string) {
    return Promise.resolve({ code: 200, msg: 'success', data: {} })
  },
}
