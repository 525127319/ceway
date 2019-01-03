import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/app',
                    component: resolve => require(['../components/app/List.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/app/edit',
                    component: resolve => require(['../components/app/Edit.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/app/add',
                    component: resolve => require(['../components/app/Add.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/app/auth',
                    component: resolve => require(['../components/app/Auth.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/service',
                    component: resolve => require(['../components/service/List.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/service/edit',
                    component: resolve => require(['../components/service/Edit.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/service/add',
                    component: resolve => require(['../components/service/Add.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/token',
                    component: resolve => require(['../components/token/List.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },   
                },
                {
                    path: '/permission',
                    component: resolve => require(['../components/permission/List.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },   
                },
                {
                    path: '/permission/auth',
                    component: resolve => require(['../components/permission/Auth.vue'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },   
                },
                {
                    path: '/log',
                    component: resolve => require(['../components/log/List.vue'],resolve),
                    meta: {
                        requireAuth:true,  // 添加该字段，表示进入这个路由是需要登录的
                    }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {

    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if (sessionStorage.getItem('access-user')) {// 判断是否登录
            next();
        } else {// 没登录则跳转到登录界面
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            });
        }
    } else {
        next();
    }
})

export default router;
