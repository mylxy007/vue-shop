<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="sendPageNo(pageNo - 1)">
            上一页
        </button>
        <button v-if="startNumAndEndNum[0] > 1" @click="sendPageNo(1)">
            1
        </button>
        <button v-if="startNumAndEndNum[0] > 2">···</button>

        <button
            v-for="(page, index) in startNumAndEndNum"
            :key="index"
            @click="sendPageNo(page)"
            :class="{ active: page == pageNo }"
        >
            {{ page }}
        </button>

        <button v-if="startNumAndEndNum[continues - 1] < totalPage - 1">
            ···
        </button>
        <button
            v-if="startNumAndEndNum[continues - 1] < totalPage"
            @click="sendPageNo(totalPage)"
        >
            {{ totalPage }}
        </button>
        <button :disabled="pageNo == totalPage" @click="sendPageNo(pageNo + 1)">
            下一页
        </button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "pagination",
    props: ["pageNo", "pageSize", "total", "continues"],
    computed: {
        //总共多少页
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        //计算出连续的页码的起始数字与结束数字
        startNumAndEndNum() {
            //先定义两个变量存储起始数字与结束数字
            let start = 0,
                end = 0;
            //连续页码数字【就是至少五页】，如果出现不正常的现象【就是不够五页】
            if (this.continues > this.totalPage) {
                start = 1;
                end = this.totalPage;
            } else {
                //正常现象
                start = this.pageNo - Math.floor(this.continues / 2);
                end = this.pageNo + Math.floor(this.continues / 2);
                //纠正不正常现象
                if (start < 1) {
                    start = 1;
                    end = this.continues;
                }
                if (end > this.totalPage) {
                    start = this.totalPage - this.continues + 1;
                    end = this.totalPage;
                }
            }
            //返回一个数组，表示分页器中间部分的连续区域
            let arr = [];
            for (let i = start; i <= end; i++) {
                arr.push(i);
            }
            return arr;
        },
    },

    methods: {
        //把当前点击的是哪一页传送给父组件
        sendPageNo(pageNo) {
            this.$emit("getPageNo", pageNo);
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>