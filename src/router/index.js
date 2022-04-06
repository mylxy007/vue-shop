import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'
//使用插件
Vue.use(VueRouter);

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push | replace
VueRouter.prototype.push = function (location, resolve, reject) {
    //要考虑上下文 如果不使用 call 改变this的指向，那上下文是 window
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    //要考虑上下文 如果不使用 call 改变this的指向，那上下文是 window
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}
//配置路由
const router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        return {
            y: 0
        }
    }
})
//全局守卫：前置路由
router.beforeEach(async (to, from, next) => {
    //用户登录了才会有token
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userInfo.name;
    if (token) {
        //用户已经登录了不能再进login
        if (to.path == '/login') {
            next('/home');
        } else {
            //登录了，但是去的不是login
            //如果有用户名
            if (name) {
                next();
            } else {
                //没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('user/getUserInfo');
                    next();
                } catch (error) {
                    store.commit('user/CLEARUSERINFO');
                    next('/login')
                }
            }
        }
    } else {
        //未登录:不能去交易相关、支付相关、个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
})
export default router