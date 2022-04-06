<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul
                    class="cart-list"
                    v-for="cartInfo in cartInfoList"
                    :key="cartInfo.id"
                >
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="cartInfo.isChecked"
                            @change="
                                updateCheckedById(
                                    cartInfo.skuId,
                                    $event.target.checked
                                )
                            "
                        />
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cartInfo.imgUrl" />
                        <div class="item-msg">
                            {{ cartInfo.skuName }}
                        </div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ cartInfo.skuPrice }}.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a class="mins" @click="handler(cartInfo, -1)">-</a>
                        <input
                            autocomplete="off"
                            type="text"
                            :value="cartInfo.skuNum"
                            minnum="1"
                            class="itxt"
                            @change="
                                handler(
                                    cartInfo,
                                    $event.target.value * 1 - cartInfo.skuNum
                                )
                            "
                        />
                        <a class="plus" @click="handler(cartInfo, 1)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{
                            cartInfo.skuPrice * cartInfo.skuNum
                        }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a
                            class="sindelet"
                            @click="deleteCartById(cartInfo.skuId)"
                            >删除</a
                        >
                        <br />
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input
                    class="chooseAll"
                    type="checkbox"
                    :checked="isAllChecked && cartInfoList.length > 0"
                    :disabled="cartInfoList.length <= 0"
                    @change="updateAllCartChecked"
                />
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteAllCheckedCart">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择 <span>0</span>件商品</div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ totalPrice }}</i>
                </div>
                <div class="sumbtn">
                    <router-link class="sum-btn" to="/trade">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { throttle } from "lodash";
export default {
    name: "ShopCart",
    data() {
        return {
            flag: true,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        //获取数据，更新视图
        async getData() {
            try {
                await this.$store.dispatch("shopCart/getShopCartList");
                this.flag = true;
            } catch (error) {
                alert(error.message);
            }
        },
        //购物车列表中对商品数量进行修改
        async handler(cartInfo, disNum) {
            if (this.flag) {
                this.flag = false;
                //减少商品数量时，判断数量是否小于1，或者输入的是不合法字符
                if ((disNum < 0 && -disNum >= cartInfo.skuNum) || isNaN(disNum))
                    disNum = 0;
                //数量不能是小数
                disNum = parseInt(disNum);
                try {
                    //代表修改成功
                    await this.$store.dispatch("detail/addOrUpdateShopCart", {
                        skuId: cartInfo.skuId,
                        skuNum: disNum,
                    });
                    //再一次获取服务器最新的数据进行展示
                    this.getData();
                } catch (error) {
                    alert(error.message);
                }
            }
        },
        //删除商品
        async deleteCartById(skuId) {
            try {
                //如果删除成功再次发送请求获取新的数据
                await this.$store.dispatch(
                    "shopCart/deleteCartListBySkuId",
                    skuId
                );
                this.getData();
            } catch (error) {
                //删除失败
                alert(error.message);
            }
        },
        //商品勾选切换
        async updateCheckedById(skuId, isChecked) {
            //带给服务器的参数isChecked，不是布尔值，应该是 0 | 1
            isChecked = isChecked === true ? 1 : 0;
            try {
                await this.$store.dispatch("shopCart/updateCheckedBySkuId", {
                    skuId,
                    isChecked,
                });
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
        //删除全部选中的商品
        async deleteAllCheckedCart() {
            try {
                await this.$store.dispatch("shopCart/deleteAllCheckedCart");
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
        //修改全选
        async updateAllCartChecked(event) {
            let checked = event.target.checked ? 1 : 0;
            try {
                await this.$store.dispatch(
                    "shopCart/updateAllCartChecked",
                    checked
                );
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
    },
    computed: {
        ...mapGetters("shopCart", ["shopCart"]),
        cartInfoList() {
            return this.shopCart.cartInfoList || [];
        },
        //计算购买产品的总价
        totalPrice() {
            let result = 0;
            this.cartInfoList.forEach((item) => {
                if (item.isChecked == 1) {
                    result += item.skuPrice * item.skuNum;
                }
            });
            return result;
        },
        //判断底部复选框是否全选
        isAllChecked() {
            //遍历数组里面原理，只要全部满足就 返回 true， 否则返回 false
            return this.cartInfoList.every((item) => item.isChecked == 1);
        },
    },
};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;
                    display: flex;
                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 32px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>