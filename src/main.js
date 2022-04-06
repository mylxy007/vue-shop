import Vue from 'vue'
import App from './App.vue'
import TypeNav from './components/TypeNav'
import Carsouel from './components/Carsouel'
import Pagination from './components/Pagination'
import '@/utils/element'
//把TypeNav注册为全局组件
Vue.component('TypeNav', TypeNav);
//把Carsouel组件注册为全局组件
Vue.component('Carsouel', Carsouel);
Vue.component('Pagination', Pagination)
//引入router
import router from './router'
//引入仓库
import store from './store'
//引入mockServer.js ---- mock数据
import './mock/mockServer'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一接口api文件里面全部请求的接口
import * as API from '@/api'
//引入插件
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.gif'
import '@/plugins/validate'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: atm
});

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  render: h => h(App),
}).$mount('#app')