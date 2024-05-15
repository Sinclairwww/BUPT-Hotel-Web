import Layout from '@/layout/index.vue'
export default [
  {
    path: '/front',
    name: 'admin',
    component: Layout,
    authKey: 'back_user_center',
    meta: {
      icon: 'component',
    },
    redirect: 'front/checkin',
    children: [
      {
        path: 'checkin',
        name: 'adminUser',
        authKey: 'back_user_manage',
        meta: {
          icon: 'user',
        },
        component: () => import('@/views/front/checkin.vue'),
      },
      {
        path: 'detail',
        name: 'adminDetail',
        authKey: 'back_user_detail',
        hidden: true,
        meta: {},
        component: () => import('@/views/admin/user/Detail.vue'),
      },
      {
        path: 'checkout',
        name: 'roleManage',
        authKey: 'back_role_manage',
        meta: {
          icon: 'peoples',
        },
        component: () => import('@/views/front/checkout.vue'),
      },
      {
        path: 'auth',
        name: 'authManage',
        authKey: 'back_auth_manage',
        meta: {
          icon: 'lock',
        },
        component: () => import('@/views/admin/auth/index.vue'),
      },
      {
        path: 'auth/config/:authId',
        name: 'authMenuConfig',
        authKey: 'back_auth_menu_manage',
        hidden: true,
        meta: { title: '权限配置' },
        component: () => import('@/views/admin/auth/AuthMenuConfig.vue'),
      },
    ],
  },
]
