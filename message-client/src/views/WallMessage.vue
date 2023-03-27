<template>
  <div style="padding:0 56px;">
    <div class="wall-message">
      <p class="wall-title">{{ wallType[0].name }}</p>
      <p class="wall-slogan">{{ wallType[0].slogan }}</p>
    </div>
    <!-- 标签列表 -->
    <div class="wall-list">
      <ul>
        <li class="list-all" :class="{ select: labelIndex == -1 }" @click="handleAllLabel">全部</li>
        <li v-for="(item, index) in label[0]" :key="index" :class="{ select: labelIndex == index }"
          @click="handleLabel(index)">
          {{ item }}</li>
      </ul>
    </div>
    <!--全部留言-->
    <div class="note-wrap">
      <NoteCard v-for="item in note.data" :note="item" :cardColor="cardColor[item.imgurl]" class="note-card"
        @click="isPop = true"></NoteCard>
    </div>
    <!-- 添加留言按钮 -->
    <div class="add" @click="showPop">
      <span class="iconfont icon-tianjia"></span>
    </div>
    <!-- 弹窗 -->
    <PopModal :isPop="isPop" :title="title" @close="showPop">
      <NewCard :id="id"></NewCard>
    </PopModal>
  </div>
</template>

<script setup lang="ts">
import NoteCard from '@/components/NoteCard.vue'
import PopModal from '@/components/PopModal.vue'
import NewCard from '@/components/NewCard.vue'
import { note, cardColor } from '../mock'
import { wallType, label } from '@/utils/data'
import { ref, provide } from 'vue'

//分类标签下标
let labelIndex = ref<number>(-1);
//留言墙与照片墙的切换id
let id = ref<number>(0);
provide('id', id);
//控制弹窗
let isPop = ref<boolean>(false);
let title = ref<string>('写留言');

//点击全部标签
const handleAllLabel = (): void => {
  labelIndex.value = -1;
}

//点击单个标签
const handleLabel = (index: number): void => {
  labelIndex.value = index;
}

//切换弹窗
const showPop = (): void => {
  isPop.value = !isPop.value;
}
</script>

<style lang="less" scoped>
.wall-message {
  text-align: center;
  width: 100%;
  padding-top: 64px;

  .wall-title {
    font-size: 56px;
    color: @gray-0;
    font-weight: 600;
  }

  .wall-slogan {
    margin-top: 8px;
    font-size: 14px;
    color: #5B5B5B;
  }

}


.wall-list {
  display: flex;
  justify-content: center;
  margin-top: 40px;

  // 选中样式
  .select {
    color: @gray-0;
    border: 1px solid rgba(32, 32, 32, 1);
    border-radius: 14px;
    font-weight: 600;
  }

  ul {
    display: flex;
    color: @gray-1;

    li {
      width: 56px;
      height: 28px;
      line-height: 26px;
      margin-right: 22px;
      text-align: center;
      cursor: pointer;
    }
  }
}

.note-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .note-card {
    margin-top: 10px;
  }
}

// 添加按钮
.add {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 56px;
  height: 56px;
  cursor: pointer;
  text-align: center;
  line-height: 56px;
  background: @gray-1;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  border-radius: 28px;

  color: #fff;

  span {
    font-size: 24px;
  }
}
</style>