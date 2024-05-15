
import adminAuthDefault from './mock/auth.json'
export default {
  getAdminMenus() {
    return Promise.resolve(adminAuthDefault)
  },
}
interface PermissionModel {
  id: number
  label: string
  authKey: string
  children?: Array<PermissionModel>
}
