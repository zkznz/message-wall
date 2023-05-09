<template>
    <div class="view-main">
        <div class="pic-bg"></div>
        <div class="pic">
            <img :src="picUrl" alt="">
        </div>

        <a-button type="primary" class="left" shape="circle" @click="back" :disabled="picIndex == 0">
            <template #icon><left-outlined style="font-size: 24px;" /></template>
        </a-button>
        <a-button type="primary" shape="circle" class="right" @click="next" :disabled="picIndex == picLength - 1">
            <template #icon><right-outlined style="font-size: 24px;" /></template>
        </a-button>

    </div>
</template>

<script setup lang="ts" scoped>
import { computed, defineProps, reactive, ref, watch } from 'vue'
import { IPicture } from '@/type'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

const props = defineProps(['cardIndex', 'picture']);
const emits = defineEmits(['back', 'next']);
let picIndex = ref(props.cardIndex);
const pictureList: IPicture[] = reactive(props.picture)
//图片url
const picUrl = computed(() => pictureList[picIndex.value].imgUrl);
//计算图片数组长度
const picLength: number = computed(() => pictureList.length).value;
//上一张
const back = () => {
    picIndex.value--;
    emits('back');
}
//下一张
const next = () => {
    picIndex.value++;
    emits('next');
}
</script>

<style lang="less" scoped>
.view-main {
    position: fixed;
    box-sizing: border-box;
    top: 52px;
    left: 0;
    width: 100%;
    height: 100%;

    .pic-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(15px)
    }

    .pic {
        position: absolute;
        padding: 30px 96px;
        padding-right: 456px;
        height: 100%;
        width: 100%;

    }

    .pic img {
        height: 90%;
        width: 100%;
    }

    .left {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
        height: 56px;
        width: 56px;
        font-size: 24px;
        color: #fff;
        border-radius: 50%;
        opacity: 0.5;
        border: none;
        background: @gray-2;

        &:hover {
            opacity: 1;
        }
    }

    .right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 380px;
        height: 56px;
        width: 56px;
        opacity: 0.5;
        border: none;
        font-size: 24px;
        color: #fff;
        border-radius: 50%;
        background: @gray-2;

        &:hover {
            opacity: 1;
        }
    }
}
</style>