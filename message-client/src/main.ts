import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
//引入样式
import "./style/common.less"
import 'ant-design-vue/dist/antd.css';
//引入字体图标
import "@/assets/fonts/icon-fonts/iconfont.css"
//引入图片懒加载
import lazyPlugin from "vue3-lazy"
//创建pinia实例
const pinia = createPinia();
const app = createApp(App);
app.use(Antd);
app.use(pinia);
app.use(router);
app.use(lazyPlugin, {
    loading: '/img/default.png',
    error: '/img/error.png'
})
app.mount('#app')
