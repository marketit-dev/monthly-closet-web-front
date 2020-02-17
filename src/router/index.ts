const routes = [
    {
        path: '/customers',
        name: 'customers',
        icon: 'nc-icon nc-bank',
        component: () => import('../pages/CustomersView'),
        layout: '/admin',
        subRoutes: [
            // {
            //     path: '/customersList',
            //     name: 'customersList',
            //     icon: 'nc-icon nc-bank',
            //     layout: '/admin',
            //     component: () => import('../pages/CustomersView'),
            // },
        ],
    },
];
export default routes;
