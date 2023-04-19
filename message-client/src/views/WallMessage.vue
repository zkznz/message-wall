<template>
  <div style="padding:0 56px;">
    <div class="wall-message">
      <p class="wall-title">{{ wallType[id].name }}</p>
      <p class="wall-slogan">{{ wallType[id].slogan }}</p>
    </div>
    <!-- 标签列表 -->
    <div class="wall-list">
      <ul>
        <li class="list-all" :class="{ select: labelIndex == -1 }" @click="handleAllLabel">全部</li>
        <li v-for="(item, index) in label[id]" :key="index" :class="{ select: labelIndex == index }"
          @click="handleLabel(item, index)">
          {{ item }}</li>
      </ul>
    </div>
    <div>
      <!-- 留言墙 -->
      <div class="note-wrap" v-if="id === 0 && flag == true">
        <NoteCard v-for="(item, index) in noteList" :note="item" :key="item.id" class="note-card"
          @handlePop="showPop(index)" :class="{ 'selected-card': index == cardIndex }">
        </NoteCard>
      </div>
      <!-- 照片墙 -->
      <div class="pic" v-if="id === 1 && flag == true">
        <PictureCard class="pic-card" v-for="(item, index) in noteList" :key="item.id" :picture="item"
          @click="showPop(index)"></PictureCard>
      </div>
      <!-- 卡片状态 -->
      <div v-if="noteList.length === 0 && flag == true" class="none-img">
        <img :src="none[id].url" alt="">
        <p>{{ none[id].msg }}</p>
      </div>
      <!-- 加载动画 -->
      <div class="loading">
        <a-spin :spinning="isOk" />
        <p v-if="!ismore">没有更多数据 ...</p>
      </div>


      <!-- 添加留言按钮 -->
      <div class="add" @click="addCard">
        <span class="iconfont icon-tianjia"></span>
      </div>
      <!-- 弹窗 -->
      <PopModal :isPop="isPop" :title="title" @close="handleClose">
        <NewCard :id="id" v-if="cardIndex == -1" @submit="submitNewCard"></NewCard>
        <CardDetail :note="noteList[cardIndex]" v-else></CardDetail>
      </PopModal>
      <!-- 照片详情 -->
      <ShowView @back="handleBack" @next="handleNext" v-if="id == 1 && isPop" :cardIndex="cardIndex" :picture="noteList">
      </ShowView>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteCard from '@/components/NoteCard.vue'
import PopModal from '@/components/PopModal.vue'
import NewCard from '@/components/NewCard.vue'
import CardDetail from '@/components/CardDetail.vue'
import PictureCard from '@/components/PictureCard.vue'
import ShowView from '@/components/ShowView.vue'
import { wallType, label, none } from '@/utils/data'
import { ref, provide, computed, watch, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { IWall } from '@/type'
import { addMessage, findMessage } from '@/api'
import { message } from 'ant-design-vue';
import useThrottle from '@/hooks/throttle'
const route = useRoute();
//路由id
let id = computed(() => Number(route.query.id));

//留言墙与照片墙的切换id
provide('id', id);
//分类标签下标
let labelIndex = ref<number>(-1);
//留言卡片标签下标
let cardIndex = ref<number>(-1);
//控制弹窗
let isPop = ref<boolean>(false);
let title = ref<string>('写留言');
//获取留言列表请求完毕标志
let flag = ref<boolean>(false);
//是否加载
let isOk = ref<boolean>(false);
//是否有更多数据
let ismore = ref<boolean>(true);
//总页数
let total = ref<number>(1);
let page = ref<number>(1);
let pagesize = ref<number>(8);
let wallInfo = reactive({});
//留言墙卡片列表
let noteList = reactive<IWall[]>([]);
//点击全部标签
const handleAllLabel = (): void => {
  labelIndex.value = -1;
  cardIndex.value = -1;
  page.value = 1;
  noteList = [];
  loading();
  isPop.value = false;
}
//关闭弹窗
const handleClose = (): void => {
  isPop.value = !isPop.value;
  cardIndex.value = -1;
}
//点击单个标签
const handleLabel = (label: string, index: number): void => {
  title.value = label;
  labelIndex.value = index;
  cardIndex.value = -1;
  page.value = 1;
  noteList = [];
  loading();
  isPop.value = false;
}
//上一张图片
const handleBack = () => {
  cardIndex.value--;
}
const handleNext = () => {
  cardIndex.value++;
}
//点击留言卡片
const showPop = (index: number): void => {
  title.value = "";
  if (cardIndex.value != index) {
    cardIndex.value = index;
    isPop.value = true;
  }
  else {
    cardIndex.value = -1;
    isPop.value = false;
  }

}
//添加留言卡片
const addCard = (): void => {
  title.value = "写留言";
  handleClose();
}
//加载留言墙
const loading = async (currentPage = 1) => {
  let messageData = {
    type: id.value,
    label: labelIndex.value,
    page: currentPage,
    pagesize: pagesize.value
  }
  let res = await findMessage(messageData);
  flag.value = false;
  if (res.status == 200) {
    noteList.push(...res.data);
    total.value = res.total;
    isOk.value = false;
    ismore.value = true;
  }
  console.log("note", noteList);
  flag.value = true;
}
//监听全局id变化
watch(id, () => {
  isPop.value = false;
  labelIndex.value = -1;
  cardIndex.value = -1;
  noteList = [];
  loading();
});
//提交留言信息给服务器，新建留言
const submitNewCard = async (wall: IWall) => {
  wallInfo = wall;
  console.log(wallInfo);
  let res = await addMessage(wall);
  if (res.status == 200) {
    message.success("感谢您的记录！");
    noteList = [];
    handleClose();
    loading();
  }
}

//滚动事件处理函数
const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight > scrollHeight) {
    //没有更多数据不需要发请求
    if (total.value == noteList.length) {
      isOk.value = false;
      ismore.value = false;
    }

    else {
      isOk.value = true;
      page.value += 1;
      setTimeout(() => loading(page.value), 1000);
    }

  }
}
//初始化加载
onMounted(() => {
  loading();
  //监听页面滚动
  window.addEventListener('scroll', useThrottle(handleScroll, 200));
})
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

//无图片时的样式
.none-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  width: 100%;
  margin-left: -60px;

  img {
    width: 150px;
    height: 150px;
    margin-bottom: 10px;
  }

  p {
    font-weight: 700;
    font-size: 24px;
    color: #9F9D9F;
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
    width: 100px;
  }

  ul {
    display: flex;
    color: @gray-1;

    li {
      height: 28px;
      line-height: 26px;
      margin-right: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}

.note-wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .note-card {
    margin-top: 10px;
  }

  //选中留言卡片
  .selected-card {
    border: 1px solid @primary;
  }
}

//加载动画
.loading {
  display: flex;
  justify-content: center;
  margin-top: 40px;

  p {
    color: @gray-2
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

//照片墙
.pic {
  width: 88%;
  margin: 0 auto;
  margin-top: 30px;
  columns: 6;
  column-gap: @padding-4;
}

.pic-card {
  margin-bottom: @padding-4;
}
</style>