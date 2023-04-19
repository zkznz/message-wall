<template>
    <div class="pic-card">
        <div class="pic-bg"></div>
        <img :src="picture.imgUrl" alt="" class="pic-img" @click="showView">
        <!-- 图片点赞 -->
        <div class="pic-like">
            <div class="like">
                <span class="iconfont icon-aixin"></span>
                <span class="like-data">{{ picture.like }}</span>
            </div>
            <div class="total">
                <span class="iconfont icon-liuyan"></span>
                <span class="total-data">{{ picture.comtotal }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps(['picture'])

//点击图片显示详情
const showView = (): void => {

}
</script>

<style lang="less" scoped>
.pic-card {
    position: relative;

    .pic-img {
        width: 100%;

    }

    &:hover .pic-bg {
        display: block;
    }

    .pic-bg {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.3);

    }

    .pic-like {
        position: absolute;
        display: flex;
        align-items: center;
        padding: @padding-8;
        background-color: @gray-10;
        opacity: 0.8;
        height: 24px;
        left: 8px;
        bottom: 8px;
        border-radius: 12px;

        .icon-aixin {
            &:hover {
                color: @warning;
            }

            cursor: pointer;
            margin-right: 3px;
        }

        .icon-liuyan {

            // &:hover {
            //     color: @gray-2;
            // }

            margin-left: 10px;
            margin-right: 3px;
        }

    }
}
</style>