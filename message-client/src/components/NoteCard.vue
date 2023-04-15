<template>
    <div class="node-card" :style="{ background: cardColor[note.color] }">
        <div class="top">
            <p>{{ messageTime }}</p>
            <p>{{ labelName }}</p>
        </div>
        <p class="message" @click="showPop">{{ note.message }}</p>
        <div class="foot">
            <div>
                <span class="iconfont icon-aixin " :class="[note.islike > 0 ? 'aixin-active' : 'icon-aixin']"
                    @click="addLike">{{
                        note.like }}</span>
                <span class="iconfont icon-liuyan liuyan">{{ note.comtotal }}</span>
            </div>
            <div class="name">{{ note.name }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cardColor } from '@/mock'
import { label } from '@/utils/data'
import { defineProps, computed, inject, defineEmits } from 'vue';
import { addLikeFeedback, delLikeFeedback } from '@/api'
import moment from 'moment'
const props = defineProps(['note']);
const emits = defineEmits(['handlePop']);
const title = inject('title', '');
const messageTime = computed(() => {
    return moment(props.note.moment).format('YYYY.MM.DD')
})
const labelName = computed(() => {
    return label[props.note.type][props.note.label]
})
const showPop = () => {
    emits('handlePop');
}
//点赞
const addLike = async () => {
    //点过赞就取消
    if (props.note.islike > 0) {
        let res = await delLikeFeedback(props.note.id, props.note.type);
        if (res.status == 200) {
            props.note.like--;
            props.note.islike--;
        }
    }
    else {
        let data = {
            id: props.note.id,
            wallId: props.note.type,
            userId: props.note.userId,
            type: 0,
            moment: new Date()
        }
        let res = await addLikeFeedback(data);
        if (res.status == 200) {
            props.note.like++;
            props.note.islike++;
        }
    }
}
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
    height: 280px;
    width: 320px;
    margin-right: 20px;
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

        .aixin-active {
            color: @warning
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