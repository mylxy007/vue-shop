import {
    reqShopCartList,
    reqDeleteCartById,
    reqUpdateCheckedById
} from "@/api";

const actions = {
    //获取购物车列表
    async getShopCartList({
        commit
    }) {
        const result = await reqShopCartList();
        if (result.code == 200) {
            commit("GETSHOPCARTLIST", result.data);
            return "ok";
        }
        return Promise.reject(new Error('faile'));
    },
    //删除购物商品
    async deleteCartListBySkuId({
        commit
    }, skuId) {
        const result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //修改商品选中状态
    async updateCheckedBySkuId({
        commit
    }, {
        skuId,
        isChecked
    }) {
        const result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        }
        return Promise.reject(new Error('faile'))
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({
        dispatch,
        getters
    }) {
        let PromiseAll = [];
        getters.shopCart.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            //将每一次返回的Promise天骄到数组中
            PromiseAll.push(promise);
        })
        //只有全部都成功，返回结果才为成功
        return Promise.all(PromiseAll);
    },
    //修改全选
    updateAllCartChecked({
        dispatch,
        getters
    }, checked) {
        let PromiseAll = [];
        getters.shopCart.cartInfoList.forEach(item => {
            if (item.isChecked != checked) {
                let promise = dispatch('updateCheckedBySkuId', {
                    skuId: item.skuId,
                    isChecked: checked
                })
                PromiseAll.push(promise);
            }
        })
        return Promise.all(PromiseAll);
    }
}
const mutations = {
    GETSHOPCARTLIST(state, data) {
        state.shopCartList = data;
    }
}
const state = {
    shopCartList: []
}
const getters = {
    shopCart(state) {
        return state.shopCartList[0] || {};
    },

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}