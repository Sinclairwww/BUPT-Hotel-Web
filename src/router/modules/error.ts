import Layout from '@/layout/index.vue'
export default [
    {
        path: '/',
        name: 'error',
        component: Layout,
        authKey: 'back_home',
        meta: { title: '无权访问', icon: 'dashboard', role: ['', 'admin', 'front', 'manager'] },
        children: [
            {
                path: '401',
                name: '401',
                component: () => import('@/views/error/401.vue'),
                meta: { title: '无权访问', role: ['admin', 'front', 'manager'] },
            },
        ],
    },
]
