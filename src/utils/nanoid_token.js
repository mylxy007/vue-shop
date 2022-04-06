import {
    nanoid
} from 'nanoid'
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getNanoid = () => {
    //先从本地存储获取nanoid（看一下本地存储里面是否有）
    let nanoid_token = localStorage.getItem('NANOIDTOKEN');
    //如果没有
    if (!nanoid_token) {
        //就生成
        nanoid_token = nanoid();
        //本地存储一次
        localStorage.setItem('NANOIDTOKEN', nanoid_token);
    }
    return nanoid_token;
}