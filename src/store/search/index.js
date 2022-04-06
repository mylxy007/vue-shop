import {
    reqSearchList
} from "@/api";
const actions = {
    //获取Search组件数据
    async getSearchList({
        commit
    }, data) {
        const result = await reqSearchList(data);
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
}
const state = {
    searchList: {}
}
const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}