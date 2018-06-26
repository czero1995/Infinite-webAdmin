import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// export const preview = {
//     path: '/preview',
//     name: 'preview',
//     component: () => import('@/views/form/article-publish/preview.vue')
// };

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [

    
    {
        path: '/recommend',
        icon: 'android-checkbox',
        name: '推荐',
        title: '推荐',
        component: Main,
        children: [
            { path: 'manage', title: '文章管理', name: 'recommend_manage', icon: 'compose', component: () => import('@/views/main-menu/recommend/manage/article-publish.vue') },
            { path: 'add', title: '添加文章', name: 'recommend_add', icon: 'compose', component: () => import('@/views/main-menu/recommend/add/article-publish.vue') },
            { path: 'edit', title: '编辑文章', name: 'recommend_edit', icon: 'compose', component: () => import('@/views/main-menu/recommend/edit/article-publish.vue') },
        ]
    },
    {
        path: '/hot',
        icon: 'android-checkbox',
        name: '热门',
        title: '热门',
        component: Main,
        children: [
            { path: 'manage', title: '文章管理', name: 'hot_manage', icon: 'compose', component: () => import('@/views/main-menu/hot/manage/article-publish.vue') },
            { path: 'add', title: '添加文章', name: 'hot_add', icon: 'compose', component: () => import('@/views/main-menu/hot/add/article-publish.vue') },
            { path: 'edit', title: '编辑文章', name: 'hot_edit', icon: 'compose', component: () => import('@/views/main-menu/hot/edit/article-publish.vue') },
        ]
    },
    {
        path: '/user',
        icon: 'android-checkbox',
        name: '用户管理',
        title: '用户管理',
        component: Main,
        children: [
            { path: 'user', title: '用户管理', name: 'user_manage', icon: 'compose', component: () => import('@/views/main-menu/user/article-publish.vue') },
            
        ]
    },



];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    // preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
