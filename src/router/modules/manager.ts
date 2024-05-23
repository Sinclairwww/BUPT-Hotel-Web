import Layout from '@/layout/index.vue'
export default [
    {
        path: '/manager-center',
        name: 'manager-center',
        authKey: 'manager-center',
        component: Layout,
        meta: {
            icon: 'component',
            title: '空调信息',
        },
        redirect: '/manager-center/report-center',
        children: [
            {
                path: 'report-center',
                name: '报表中心',
                authKey: 'report-center',
                component: () => import('@/views/manager/index.vue'),
                meta: {
                    icon: 'list',
                    title: '运行信息',
                },
            }
        ],
    },
]