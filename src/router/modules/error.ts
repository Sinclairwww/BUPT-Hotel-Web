import Layout from '@/layout/index.vue'
export default [
    {
        path: '/error',
        name: 'error',
        component: Layout,
        authKey: 'error',
        meta: { title: '无权访问', noCheck: true },
        children: [
            {
                path: '401',
                name: '401',
                component: () => import('@/views/error/401.vue'),
                meta: { title: '无权访问', noCheck: true },
            },
        ],
    },
]
