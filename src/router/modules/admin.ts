import Layout from '@/layout/index.vue'
export default [
  {
    path: '/front',
    name: 'admin',
    component: Layout,
    authKey: 'front',
    meta: {
      icon: 'component',
    },
    redirect: 'front/checkin',
    children: [
      {
        path: 'check-in',
        name: 'check-in',
        authKey: 'check-in',
        meta: {
          icon: 'user',
        },
        component: () => import('@/views/front/checkin.vue'),
      },
      {
        path: 'check-out',
        name: 'check-out',
        authKey: 'back_role_manage',
        meta: {
          icon: 'peoples',
        },
        component: () => import('@/views/front/checkout.vue'),
      },


    ],
  },
]
