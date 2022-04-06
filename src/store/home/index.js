import {
    reqCategoryList,
    reqBannerList,
    reqFloorList,
} from "@/api"
const actions = {
    //通过API里面的接口函数调用，向服务器发请求, 获取服务器的数据
    async getCategoryList({
        commit
    }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit('GETCATEGORYLIST', result.data)
        }
    },
    //获取banner（Home首页轮播图）数据
    async getBannerList({
        commit
    }) {
        let result = await reqBannerList();
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    //获取floor组件数据
    async getFloorList({
        commit
    }) {
        let result = await reqFloorList();
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data);
        }
    },

}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },

}
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],

}
const getters = {

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}