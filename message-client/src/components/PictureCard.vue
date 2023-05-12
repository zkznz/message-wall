<template>
    <div class="pic-card">
        <div class="pic-bg" @click="showView"></div>
        <img :src="pictureItem.imgUrl" alt="" class="pic-img">
        <!-- 图片点赞 -->
        <div class="pic-like">
            <div class="like">
                <span class="iconfont icon-aixin" :class="[pictureItem.islike > 0 ? 'aixin-active' : 'icon-aixin']"
                    @click="addLike"></span>
                <span class="like-data">{{ pictureItem.like }}</span>
            </div>
            <div class="total">
                <span class="iconfont icon-liuyan"></span>
                <span class="total-data">{{ pictureItem.comtotal }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, reactive } from 'vue'
import { delFeedback, addFeedback } from '@/api'
import { useMainStore } from '@/store'
const props = defineProps(['picture'])
const store = useMainStore();
let pictureItem = computed(() => reactive(props.picture));
const emits = defineEmits(['handle'])
//点赞
const addLike = async () => {
    //点过赞就取消
    if (pictureItem.value.islike > 0) {
        let res = await delFeedback(pictureItem.value.id, store.user.id, 0);
        if (res.status === 200) {
            pictureItem.value.like--;
            pictureItem.value.islike = 0;
        }
    }
    else {
        let data = {
            wallId: pictureItem.value.id,
            userId: store.user.id,
            type: 0,
            moment: new Date()
        }
        let res = await addFeedback(data);
        if (res.status == 200) {
            pictureItem.value.like++;
            pictureItem.value.islike++;
        }
    }
}
const showView = () => {
    emits('handle');
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
        cursor: pointer;
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

        .aixin-active {
            color: @warning
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