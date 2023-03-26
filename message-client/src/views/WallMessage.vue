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
      <NoteCard v-for="item in note.data" :note="item" :cardColor="cardColor[item.imgurl]" class="note-card"></NoteCard>
    </div>

  </div>
</template>

<script setup lang="ts">
import NoteCard from '@/components/NoteCard.vue'
import { note, cardColor } from '../mock'
import { wallType, label } from '@/utils/data'
import { ref } from 'vue'

//分类标签下标
let labelIndex = ref<number>(-1);

//点击全部标签
const handleAllLabel = (): void => {
  labelIndex.value = -1;
}
//点击单个标签
const handleLabel = (index: number): void => {
  labelIndex.value = index;
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
</style>