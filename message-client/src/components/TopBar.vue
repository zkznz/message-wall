<template>
    <div class="top-bar">
        <div class="left">
            <img src="@/assets/img/logo.svg" class="logo" alt="">
            <h3>轻语留言</h3>
        </div>
        <div class="middle">
            <a-button shape="round" :class="{ 'active': id == 0 }" @click="changeWall(0)">留言墙</a-button>
            <a-button shape="round" :class="{ 'active': id == 1 }" middle @click="changeWall(1)">照片墙</a-button>
        </div>
        <div class="right">
            <div class="user"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"
const route = useRoute();
const router = useRouter();
let id = computed(() => route.query.id);
//跳转留言墙或照片墙
const changeWall = (e: number): void => {
    router.push({
        query: {
            id: e
        }
    })
}

</script>

<style lang="less" scoped>
.top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    box-shadow: 0px 0px 1px 0px;
    top: 0;
    padding-left: 30px;
    z-index: 10;
    height: 52px;
    width: 100%;
    background-color: #fff;

    .left {
        display: flex;


        h3 {
            padding-top: 3px;
        }

        .logo {
            width: 32px;
            height: 32px;
            margin-right: 10px;
        }
    }

    .middle {
        flex: 1;
        display: flex;
        margin-right: 20px;
        justify-content: center;

        .active {
            background-color: #3b73f0;
            color: #fff;
        }

        .ant-btn {
            margin: 0 15px;
        }
    }

    .right {

        .user {
            border-radius: 50%;
            height: 36px;
            width: 36px;
            background-image: linear-gradient(180deg, #7BE7FF 2%, #1EB5E2);
        }
    }
}
</style>