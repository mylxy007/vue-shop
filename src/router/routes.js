// //引入一级-路由组件
// import Home from '../pages/Home'
// import Search from '../pages/Search'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import Detail from '../pages/Detail'
// import AddCartSuccess from '../pages/AddCartSuccess'
// import ShopCart from '../pages/ShopCart'
// import Trade from '../pages/Trade'
// import Pay from '../pages/Pay'
// import PaySuccess from '../pages/PaySuccess'
// import Center from '../pages/Center'
// //引入二级路由组件
// import MyOrder from '../pages/Center/MyOrder'
// import GroupOrder from '../pages/Center/GroupOrder'
//使用路由懒加载
export default [{
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            showFooter: true
        }
    },
    {
        name: 'search',
        //不加占位就不会显示在地址栏
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: {
            showFooter: true
        },
        //1.布尔值
        //接受所有params参数
        // props: true,
        //2.对象
        // props: {a:1,b:2};
        //3函数
        props: ($route) => {
            return {
                keyword: $route.params.keywod,
                k: $route.query.keyword
            }
        }
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            showFooter: false
        }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            showFooter: false
        }
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: () => import('@/pages/Detail'),
        meta: {
            showFooter: false
        },
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            showFooter: true,
        }
    },
    {
        name: 'shopCart',
        path: '/shopCart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            showFooter: true
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            console.log(from.path);
            if (from.path == '/shopCart' || from.path == '/') {
                next();
            } else {
                next(from.path);
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            showFooter: true,
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade' || from.path == '/') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: 'paySuccess',
        path: '/paySuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            showFooter: true,
        }
    },
    {
        name: 'center',
        path: '/center',
        redirect: '/center/myOrder',
        component: () => import('@/pages/Center'),
        meta: {
            showFooter: true,
        },
        children: [{
                path: 'myOrder',
                component: () => import('@/pages/Center/MyOrder'),
            },
            {
                path: 'groupOrder',
                component: () => import('@/pages/Center/GroupOrder')
            }
        ]
    }
]