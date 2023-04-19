<template>
    <div class="node-card" :style="{ background: cardColor[noteItem.color] }">
        <div class="top">
            <p>{{ messageTime }}</p>
            <p>{{ labelName }}</p>
        </div>
        <p class="message" @click="showPop">{{ noteItem.message }}</p>
        <div class="foot">
            <div>
                <span class="iconfont icon-aixin " :class="[noteItem.islike > 0 ? 'aixin-active' : 'icon-aixin']"
                    @click="addLike">{{
                        noteItem.like }}</span>
                <span class="iconfont icon-liuyan liuyan">{{ noteItem.comtotal }}</span>
            </div>
            <div class="name">{{ noteItem.name }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cardColor } from '@/mock'
import { label } from '@/utils/data'
import { defineProps, computed, inject, defineEmits, toRefs, reactive, PropType } from 'vue';
import { addLikeFeedback, delLikeFeedback } from '@/api'
import moment from 'moment'
import { useMainStore } from '@/store'
const store = useMainStore();
const props = defineProps(['note']);
const noteItem = computed(() => reactive(props.note));
const emits = defineEmits(['handlePop', 'loading']);
const title = inject('title', '');
const messageTime = computed(() => {
    return moment(noteItem.value.moment).format('YYYY.MM.DD')
})
const labelName = computed(() => {
    return label[noteItem.value.type][noteItem.value.label]
})
const showPop = () => {
    emits('handlePop');
}
//点赞
const addLike = async () => {
    //点过赞就取消
    if (noteItem.value.islike > 0) {
        let res = await delLikeFeedback(noteItem.value.id, noteItem.value.userId, noteItem.value.type);
        if (res.status == 200) {
            noteItem.value.like--;
            noteItem.value.islike = 0;
        }
    }
    else {
        let data = {
            wallId: noteItem.value.id,
            userId: store.user.id,
            type: 0,
            moment: new Date()
        }
        let res = await addLikeFeedback(data);
        if (res.status == 200) {
            noteItem.value.like++;
            noteItem.value.islike++;
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