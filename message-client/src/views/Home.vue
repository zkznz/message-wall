<template>
  <!-- 背景图片虚化 -->
  <img src="@/assets/img/bg.png" class="bg" alt="">
  <div>
    <TopBar></TopBar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import TopBar from '@/components/TopBar.vue';
</script>
<style lang="less" scoped>
.bg {
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0;
  filter: blur(20px);
  z-index: -20;
}
</style>
