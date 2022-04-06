<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "Carsouel",
    //接受父组件传过来的轮播图图片信息
    props: ["bannerList"],
    watch: {
        //监听bannerList数据的变化：因为这条数据发生过变化----由空数组变味数组里面有四个元素
        bannerList: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.mySwiper, {
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                    });
                });
            },
        },
    },
};
</script>

<style>
</style>