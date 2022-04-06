<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseenter="enterShow(true)" @mouseleave="enterShow(false)">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch()">
                            <div
                                class="item"
                                v-for="(c1, index) in categoryList.slice(0, 15)"
                                :key="c1.categoryId"
                                @mouseenter="changeIndex(index)"
                                @mouseleave="changeIndex(-1)"
                            >
                                <h3 :class="{ cur: currentIndex == index }">
                                    <a
                                        :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId"
                                        >{{ c1.categoryName }}</a
                                    >
                                </h3>
                                <div
                                    class="item-list clearfix"
                                    v-show="currentIndex == index"
                                >
                                    <div class="subitem">
                                        <dl
                                            class="fore"
                                            v-for="c2 in c1.categoryChild"
                                            :key="c2.categoryId"
                                        >
                                            <dt>
                                                <a
                                                    :data-categoryName="
                                                        c2.categoryName
                                                    "
                                                    :data-category2Id="
                                                        c2.categoryId
                                                    "
                                                    >{{ c2.categoryName }}</a
                                                >
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="c3 in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        :data-categoryName="
                                                            c3.categoryName
                                                        "
                                                        :data-category3Id="
                                                            c3.categoryId
                                                        "
                                                        >{{
                                                            c3.categoryName
                                                        }}</a
                                                    >
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
    name: "TypeNav",
    // props: {
    //     show: {
    //         type: Boolean,
    //         default: true,
    //     },
    // },
    // 数据
    data() {
        return {
            // 当前一级分类的索引值
            currentIndex: -1,
            //控制分类列表展示或隐藏
            show: true,
        };
    },
    //组件挂载完毕：可以向服务器发请求
    mounted() {
        //如果在 search页面，则 分类列表设置为隐藏
        if (this.$route.path != "/home") {
            this.show = false;
        }
    },
    //映射 store home 下的 商品分类列表
    computed: {
        ...mapState("home", ["categoryList"]),
    },
    methods: {
        // changeIndex(index) {
        //     this.currentIndex = index;
        // },
        //通过插件节流
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }),
        //跳转到搜索页面
        goSearch() {
            let e = event.target;
            let { categoryname, category1id, category2id, category3id } =
                e.dataset;
            //判断点击的是否是a标签
            if (categoryname) {
                let location = { name: "search" };
                let query = { categoryName: categoryname };
                //判断一，二，三级分类
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                location.query = query;
                location.params = {};
                this.$router.push(location);
            }
        },
        //控制在search页面中，商品分类列表显示或云存储
        enterShow(isShow) {
            if (this.$route.path != "/home") {
                this.show = isShow;
            }
        },
    },
};
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }
                    a {
                        cursor: pointer;
                    }
                    .cur {
                        background-color: skyblue;
                    }
                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
            }
        }
        .sort-enter-active {
            overflow: hidden;
            transition: all 0.5s 0s linear;
        }
        .sort-enter {
            height: 0px;
        }
        .sort-enter-to {
            height: 461px;
        }
    }
}
</style>