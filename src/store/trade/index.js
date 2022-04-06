import {
    reqAddressInfo,
    reqOrderInfo
} from '@/api'
const actions = {
    //获取用户地址信息
    async getUserAddress({
        commit
    }) {
        const result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data);
        }
    },
    //获取商品清单
    async getOrderInfo({
        commit
    }) {
        const result = await reqOrderInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
}
const state = {
    addressInfo: [],
    orderInfo: {}
}
const getters = {}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}