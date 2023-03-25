import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
//引入样式
import "./style/common.less"
//引入字体图标
import "@/assets/fonts/icon-fonts/iconfont.css"

//创建pinia实例
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app')
