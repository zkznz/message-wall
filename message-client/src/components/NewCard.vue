<template>
    <!-- 颜色选择 -->
    <div class="color-list">
        <div class="color" v-for="(item, index) in cardColor1" :key="index"
            :class="{ 'color-select': index == selectedIndex }" :style="{ background: item }" @click="changeColor(index)">
        </div>
    </div>
    <!-- 留言内容 -->
    <div class="card-main" :style="{ background: cardColor1[selectedIndex] }">
        <textarea placeholder="留言..." class="message" maxlength="100"></textarea>
        <input type="text" placeholder="签名" class="name">
    </div>
    <!-- 标签 -->
    <div class="label">
        <p class="title">选择标签</p>
        <div class="label-list">
            <span v-for="(item, index) in label[id]" :key="index" :class="{ 'selected': labelIndex == index }"
                @click="changeLabel(index)">{{ item
                }}</span>
        </div>
    </div>
    <!-- 免责声明 -->
    <div class="summary">
        <p class="title">免责声明</p>
        <p class="mzsm">
            该项目是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：
            <br />1、反对宪法所确定的基本原则的；
            <br />2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；
            <br />3、损害国家荣誉和利益的；
            <br />4、煽动民族仇恨、民族歧视，破坏民族团结的；
            <br />5、破坏国家宗教政策，宣扬邪教和封建迷信的；
            <br />6、散布谣言，扰乱社会秩序，破坏社会稳定的；
            <br />7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
            <br />8、侮辱或者诽谤他人，侵害他人合法权益的；
            <br />9、含有法律、行政法规禁止的其他内容的信息。
        </p>
    </div>
    <!-- 按钮 -->
    <div class="control">
        <a-button shape="round" type="danger" size="large" style="margin-right: 10px;">丢弃</a-button>
        <a-button shape="round" type="primary" size="large" style="width: 200px;">确定</a-button>
    </div>
</template>

<script setup lang="ts">
import { cardColor1, } from "@/mock"
import { ref, inject } from 'vue'
import { label } from '@/utils/data'

let id: number = inject('id', 0);

//已选中的颜色
let selectedIndex = ref<number>(0);
//选中的标签
let labelIndex = ref<number>(0);
//留言名
let name = ref<string>('');
//切换颜色
const changeColor = (index: number): void => {
    selectedIndex.value = index;
}
//切换标签
const changeLabel = (index: number): void => {
    labelIndex.value = index;
}
</script>

<style lang="less" scoped>
// 字体样式
@font-face {
    font-family: 'HanziPenSC-W3';
    src: url("@/assets/fonts/HanzipenSC/HanzipenSC.ttf");
}

.color-list {
    display: flex;
    margin-bottom: 20px;

    .color {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        cursor: pointer;
    }

    .color-select {
        border: 2px solid rgba(59, 115, 240, 1);
    }
}

.card-main {
    width: 100%;
    height: 240px;
    padding: @padding-12;
    transition: .3s;

    .message {
        box-sizing: border-box;
        border: none;
        padding: @padding-8;
        overflow-y: hidden;
        resize: none;
        background: none;
        font-family: HanziPenSC-W3;
        font-size: 14px;
        color: @gray-1;
        height: 172px;
        width: 100%;
    }

    .name {
        box-sizing: border-box;
        padding: @padding-8;
        width: 100%;
        line-height: 20px;
        font-size: 14px;
        color: @gray-0;
        border: none;
        background: none;
        border: 1px solid #fff;
    }

}

// 标签
.label {
    padding-top: 20px;
    // padding: 10px;

    .label-list {
        display: flex;
        flex-wrap: wrap;
        width: 320px;

        span {
            margin: 10px 5px 5px 0;
            font-size: @size-14;
            padding: 4px 8px;
            color: @gray-1;
            cursor: pointer;
        }

        .selected {
            color: @gray-0;
            font-weight: 600;
            background: #ccc;
            border-radius: 14px;
            transition: .3s;
        }
    }
}

// 免责声明
.summary {
    padding-top: 10px;
    padding-bottom: 50px;

    .mzsm {
        padding-top: 5px;
        color: @gray-2;
        line-height: 28px;
    }
}

// 按钮
.control {
    position: fixed;
    margin-bottom: -10px;
    padding: @padding-20;
    width: 100%;
    bottom: 20px;
    // background-color: pink;

}

.title {
    width: 56px;
    height: 20px;
    font-size: 14px;
    color: @gray-0;
    font-weight: 600;
    margin-bottom: 10px;
}
</style>