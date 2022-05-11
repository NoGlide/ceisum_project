import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Welcome from '../components/Welcome.vue';
import Users from '../components/user/Users.vue';
import MyMap from '../components/cesium/MyMap.vue';
import FirePoint from '../components/cesium/FirePoint.vue';
import FirePolygon from '../components/cesium/FirePolygon.vue';
import Rights from '../components/rights/Rights.vue';
import Roles from '../components/rights/Roles.vue';
import Reports from '../components/data/Reports.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/home',
        component: Home,
        redirect: '/Welcome',
        children: [{
                path: '/Welcome',
                component: Welcome,
            },
            {
                path: '/users',
                component: Users,
            },
            {
                name: MyMap,
                path: '/mymap',
                component: MyMap,
            },
            {
                path: '/firepoint',
                component: FirePoint,
            },
            {
                path: '/firepolygon',
                component: FirePolygon,
            },
            {
                path: '/rights',
                component: Rights,
            },
            {
                path: '/roles',
                component: Roles,
            },
            {
                path: '/reports',
                component: Reports,
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(to, from);
    const token = window.sessionStorage.getItem('token');
    if (!token && to.path !== '/login') {
        next('/login');
    }
    next();
});
export default router;