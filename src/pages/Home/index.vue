<template>
    <div class="home">
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="f in floorList" :key="f.id" :floorList="f"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: "Home",
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted() {
        //派发action，获取floor组件的数据
        this.$store.dispatch("home/getFloorList");
    },
    computed: {
        ...mapState("home", ["floorList"]),
    },
};
</script>

<style>
</style>