//登录与注册模块
import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogout
} from "@/api"
import {
    setToken,
    getToken,
    removeToken
} from '@/utils/token'
const actions = {
    //获取验证码
    async getCode({
        commit
    }, phone) {
        //获取验证码这个接口：把验证码返回，但是正常情况，后台把验证码发送到用户手机上
        const result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        }
        return Promise.reject(new Error('faile'));
    },
    //用户注册
    async userRegister({
        commit
    }, regInfo) {
        const result = await reqUserRegister(regInfo);
        if (result.code == 200)
            return 'ok';
        return Promise.reject(new Error(result.message));
    },
    //用户登录
    async userLogin({
        commit
    }, logInfo) {
        const result = await reqUserLogin(logInfo);
        if (result.code == 200) {
            //用户已经登录成功且获取到token
            commit('USERLOGIN', result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok';

        }
        return Promise.reject(new Error(result.message));
    },
    //获取用户信息（需要携带用户token向服务器要用户信息）
    async getUserInfo({
        commit
    }) {
        const result = await reqUserInfo();
        if (result.code == 200) {
            //提交用户信息
            commit('GETUSERINFO', result.data);
            return 'ok';
        }
        return Promise.reject(new Error(result.message));
    },
    //退出登录
    async userLogout({
        commit
    }) {
        const result = await reqLogout();
        if (result.code == 200) {
            //action里面不能操作state，提交mutation修改state
            commit('CLEARUSERINFO');
            return 'ok';
        }
        return Promise.reject(new Error(result.message));
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清除用户信息
    CLEARUSERINFO(state) {
        //帮仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储数据清空
        removeToken();
    }
}
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}