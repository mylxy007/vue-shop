//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequest from './mockAjax'
export const reqCategoryList = () => requests({
    method: 'get',
    url: '/product/getBaseCategoryList'
});

//获取banner（Home首页轮播图接口）
export const reqBannerList = () => mockRequest.get('/banner')
export const reqFloorList = () => mockRequest.get('/floor')
//获取 搜索 页面数据
export const reqSearchList = (data) => requests({
    method: 'post',
    url: '/list',
    data
})
//获取商品详情信息
export const reqDetailList = (skuid) => requests({
    method: 'get',
    url: `/item/${skuid}`
})
//把商品加入到购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`
})
//获取购物车列表
export const reqShopCartList = () => requests({
    method: 'get',
    url: '/cart/cartList'
})
//删除购物车信息
export const reqDeleteCartById = (skuId) => requests({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`
})
//修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    method: 'get',
    url: `/cart/checkCart/${skuId}/${isChecked}`
})
//获取验证码
export const reqGetCode = (phone) => requests({
    method: 'get',
    url: `/user/passport/sendCode/${phone}`
})
//注册用户
export const reqUserRegister = (data) => requests({
    method: 'post',
    url: `/user/passport/register`,
    data
})
//用户登录
export const reqUserLogin = (data) => requests({
    method: 'post',
    url: `/user/passport/login`,
    data
})
//获取用户信息（需要携带用户token向服务器要用户信息）
export const reqUserInfo = () => requests({
    method: 'get',
    url: '/user/passport/auth/getUserInfo'
})
//退出登录
export const reqLogout = () => requests({
    method: 'get',
    url: 'user/passport/logout'
})
//获取用户地址信息
export const reqAddressInfo = () => requests({
    method: 'get',
    url: '/user/userAddress/auth/findUserAddressList'
})
//获取订单交易信息 商品清单
export const reqOrderInfo = () => requests({
    method: 'get',
    url: '/order/auth/trade'
})
//提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => requests({
    method: 'post',
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data
})
//获取支付信息
export const reqPayInfo = (orderId) => requests({
    method: 'get',
    url: `/payment/weixin/createNative/${orderId}`

})
//获取支付订单状态
export const reqPayStatus = (orderId) => requests({
    method: 'get',
    url: `/payment/weixin/queryPayStatus/${orderId}`
})
//获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({
    method: 'get',
    url: `/order/auth/${page}/${limit}`
})