<template>
    <transition name="modal">
        <div class="pop-modal" v-if="isPop">
            <div class="header">
                <div class="modal-name">{{ title }}</div>
                <close-outlined class="icon-close" @click="closePop" />
            </div>
            <div class="modal-main">
                <slot></slot>
            </div>
            <div class="footer"></div>
        </div>
    </transition>
</template>

<script setup lang="ts" >
import { CloseOutlined } from '@ant-design/icons-vue';
import { defineProps, defineEmits } from 'vue';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia'
const store = useMainStore();
const props = defineProps({
    title: String,
})
let { isPop } = storeToRefs(store);
console.log("isPop", isPop.value);
const emit = defineEmits(['close']);
//关闭弹窗
const closePop = () => {
    emit('close');
}
</script>

<style lang='less' scoped>
.modal {
    &-enter {
        &-from {
            transform: translateX(360px);
        }

        &-active {
            transition: linear .1s;
        }

        &-to {
            transform: translateX(0px);
        }
    }

    &-leave {
        &-from {
            transform: translateX(0px);
        }

        &-active {
            transition: all .2s;
        }

        &-to {
            transform: translateX(360px);
        }
    }

}


.pop-modal {
    position: fixed;
    right: 0;
    top: 52px;
    z-index: 5;
    width: 360px;
    height: 100%;
    background: #e9e9ef;
    padding-right: 5px;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.08);

    // 顶部
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        padding-right: 25px;
        // margin-bottom: 30px;

        .modal-name {
            font-size: 16px;
            color: @gray-0;
            font-weight: 600;
        }

        .icon-close {
            // width: 25px;
            // height: 25px;
            // line-height: 25px;
            padding-left: 15px;
            color: @gray-1;
            cursor: pointer;
            font-size: 14px;

        }
    }

    // 内容区域
    .modal-main {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        padding: 0 20px 160px;

    }

    .modal-main::-webkit-scrollbar {
        width: 5px;
        height: 14px;
    }

    .modal-main::-webkit-scrollbar-thumb {
        // /* background-color: #01c8dc;

        // background-color: #b6b6b6;
        background-color: rgba(0, 0, 0, 0.3)
    }
}
</style>