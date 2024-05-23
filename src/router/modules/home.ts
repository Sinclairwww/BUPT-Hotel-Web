import Layout from '@/layout/index.vue'
export default [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/dashboard',
    authKey: 'back_home',
    meta: {
      title: '首页', icon: 'dashboard', role: ['admin', 'front', 'manager']
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', affix: true, role: ['admin', 'front', 'manager'] },
      },
    ],
  },
]
