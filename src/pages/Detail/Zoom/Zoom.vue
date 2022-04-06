<template>
    <div class="spec-preview">
        <img :src="imgObj.imgUrl" />
        <div class="event" @mousemove="handler"></div>
        <div class="big">
            <img :src="imgObj.imgUrl" ref="bigImg" />
        </div>
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
    name: "Zoom",
    props: ["skuImageList"],
    data() {
        return {
            imgIndex: 0,
        };
    },
    //绑定自定义事件，获取当前放大镜要显示的图片
    mounted() {
        this.$bus.$on("getIndex", (index) => {
            this.imgIndex = index;
        });
    },
    computed: {
        imgObj() {
            return this.skuImageList[this.imgIndex] || {};
        },
    },
    methods: {
        //放大镜逻辑实现
        handler() {
            let e = event;
            let mask = this.$refs.mask;
            let maskX = e.offsetX - mask.offsetWidth / 2;
            let maskY = e.offsetY - mask.offsetHeight / 2;
            let maskMaxX = e.target.offsetWidth - mask.offsetWidth;
            let maskMaxY = e.target.offsetHeight - mask.offsetHeight;
            maskX = maskX < 0 ? 0 : maskX > maskMaxX ? maskMaxX : maskX;
            maskY = maskY < 0 ? 0 : maskY > maskMaxY ? maskMaxY : maskY;
            mask.style.top = maskY + "px";
            mask.style.left = maskX + "px";
            let bigImg = this.$refs.bigImg;
            bigImg.style.top = -maskY * 2 + "px";
            bigImg.style.left = -maskX * 2 + "px";
        },
    },
};
</script>

<style lang="less">
.spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        display: none;
        background: white;

        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
        display: block;
    }
}
</style>