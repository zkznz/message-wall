<template>
  <!-- 背景图片虚化 -->
  <img src="/img/bg.png" class="bg" alt="">
  <div style="padding-bottom: 60px;">
    <TopBar></TopBar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import TopBar from '@/components/TopBar.vue';
import { useMainStore } from '@/store'
const store = useMainStore();
//进入页面获取用户ip
store.initUser();
</script>
<style lang="less" scoped>
.bg {
  position: fixed;
  height: calc(100vh);
  width: 100%;
  margin: 0;
  filter: blur(10px);
  z-index: -20;
}
</style>
