import {
    reqDetailList,
    reqAddOrUpdateShopCart
} from "@/api";
//封装游客身份模块nanoid--->生成随机
import {
    getNanoid
} from '@/utils/nanoid_token'

const actions = {
    //获取商品详情信息
    async getDetailList({
        commit
    }, skuid) {
        const result = await reqDetailList(skuid);
        if (result.code == 200)
            commit('GETDETAILLIST', result.data);
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        //加入购物车返回的结果
        const result = await reqAddOrUpdateShopCart(skuId, skuNum); //返回的是一个Promise
        if (result.code == 200)
            return "ok";
        return Promise.reject(new Error('faile'));
    }
};
const mutations = {
    GETDETAILLIST(state, data) {
        state.detailList = data;
    },
    ADDORUPDATESHOPCART(state) {
        state
    }
};
const state = {
    detailList: {},
    //游客临时身份
    nanoid_token: getNanoid()

};
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        return state.detailList.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.detailList.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.detailList.spuSaleAttrList || []
    }
};
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}