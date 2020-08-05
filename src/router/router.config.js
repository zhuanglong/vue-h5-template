import Layouts from '@/views/layouts';

const routerMap = [
  {
    path: '/',
    component: Layouts,
    redirect: '/home',
    meta: { title: '首页', keepAlive: false },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/home/Home.vue'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "About" */ '@/views/home/About.vue'),
        meta: { title: '关于', keepAlive: false }
      }
    ]
  }
];

export default routerMap;
