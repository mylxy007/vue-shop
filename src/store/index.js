import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
Vue.use(Vuex);
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart';
import user from './user'
import trade from './trade'

//对外暴露store类的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})