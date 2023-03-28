<template>
    <div class="node-card" :style="{ background: cardColor[note.imgurl] }">
        <div class="top">
            <p>{{ messageTime }}</p>
            <p>写留言</p>
        </div>
        <p class="message">{{ note.message }}</p>
        <div class="foot">
            <div>
                <span class="iconfont icon-aixin ">{{ note.like }}</span>
                <span class="iconfont icon-liuyan liuyan">{{ note.comment }}</span>
            </div>
            <div class="name">{{ note.name }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cardColor } from '@/mock'
import { defineProps, computed, inject } from 'vue';
import moment from 'moment'
const props = defineProps(['note']);
const title = inject('title', '');
console.log("title", title);
const messageTime = computed(() => {
    return moment(props.note.moment).format('YYYY.MM.DD')
})
</script>

<style lang="less" scoped>
// 字体样式
@font-face {
    font-family: 'HanziPenSC-W3';
    src: url("@/assets/fonts/HanzipenSC/HanzipenSC.ttf");
}

.node-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 240px;
    width: 270px;
    padding: 10px 20px 16px 20px;

    .top {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #7E7E7E;
    }

    .message {
        height: 140px;
        line-height: 22px;
        font-weight: 400;
        font-size: 14px;
        margin-top: 19px;
        margin-bottom: 22px;
        font-family: HanziPenSC-W3;
        color: @gray-0;
    }

    .foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;

        .icon-aixin {
            color: @gray-2;
            cursor: pointer;

            &:hover {
                color: @warning;
            }
        }

        .liuyan {
            margin-left: 10px;
            color: @gray-2
        }

        .name {
            font-family: HanziPenSC-W3;
            font-size: 14px;
            font-weight: 700;
        }
    }
}
</style>