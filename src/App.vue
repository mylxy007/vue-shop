<template>
    <div id="app">
        <Header></Header>
        <!-- 路由组件出口 -->
        <router-view></router-view>
        <Footer v-show="$route.meta.showFooter"></Footer>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
    name: "App",
    components: {
        Header,
        Footer,
    },
    mounted() {
        //通知Vuex发请求，获取数据，存储于仓库中
        this.$store.dispatch("home/getCategoryList");
    },
};
</script>

<style>
</style>
