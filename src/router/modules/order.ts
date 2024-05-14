import Layout from '@/layout/index.vue'
export default [
  {
    path: '/order',
    name: 'order',
    authKey: 'order_center',
    component: Layout,
    meta: {
      icon: 'component',
      title: '空调信息',
    },
    // redirect: '/order/list',
    children: [
      {
        path: 'list',
        name: 'orderList',
        authKey: 'order_list',
        component: () => import('@/views/order/List.vue'),
        meta: {
          icon: 'list',
          title: '运行信息',
        },
      },
      {
        path: 'detail',
        name: 'orderDetail',
        hidden: true,
        authKey: 'order_detail',
        component: () => import('@/views/order/Detail.vue'),
        meta: {
          icon: 'list',
          title: '空调详情',
          divide: true,
        },
      },
    ],
  },
]
