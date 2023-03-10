import MainLayout from 'layouts/MainLayout';
import GameLayout from 'layouts/GameLayout';
import BannerLayout from 'layouts/BannerLayout';

import MainMenu from 'pages/MainMenu';
import SetupPage from 'pages/SetupPage';
import ExportPage from 'pages/ExportPage';
import BannerPage from 'pages/BannerPage';

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: MainMenu
            },
            {
                path: 'setup',
                component: SetupPage
            },
            {
                path: 'export',
                component: ExportPage
            }
        ]
    },
    {
        path: '/game',
        component: GameLayout
    },
    {
        path: '/banner',
        component: BannerLayout,
        children: [
            {
                path: '',
                component: BannerPage
            }
        ]
    }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    });
}

export default routes;
