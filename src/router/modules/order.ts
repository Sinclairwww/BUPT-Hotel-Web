import Layout from '@/layout/index.vue'
export default [
  {
    path: '/air-condition',
    name: 'air-condition',
    authKey: 'air-condition',
    component: Layout,
    meta: {
      icon: 'component',
      title: '空调信息',
    },
    redirect: '/air-condition/control',
    children: [
      {
        path: 'control',
        name: '空调信息',
        authKey: 'control',
        component: () => import('@/views/admin/admin.vue'),
        meta: {
          icon: 'list',
          title: '运行信息',
        },
      },
    ],
  },
]
