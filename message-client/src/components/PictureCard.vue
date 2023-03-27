<template>
    <div class="pic-card">
        <img :src="require(`@/assets/img/${picture.imgurl}.png`)" alt="" class="pic-img">
        <div class="pic-bg"></div>
        <!-- 图片点赞 -->
        <div class="pic-like">
            <div class="like">
                <span class="iconfont icon-aixin"></span>
                <span class="like-data">{{ picture.like }}</span>
            </div>
            <div class="total">
                <span class="iconfont icon-liuyan"></span>
                <span class="total-data">{{ picture.comment }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps(['picture'])

</script>

<style lang="less" scoped>
.pic-card {
    position: relative;

    .pic-img {
        width: 100%;
    }

    .pic-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.2);
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

            // display: inline-block;
            // vertical-align: middle;
            &:hover {
                color: @gray-2;
            }

            cursor: pointer;
            margin-left: 10px;
            margin-right: 3px;
        }

    }
}
</style>