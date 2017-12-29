// 项目的入口js文件

// 1 导入vue
import Vue from 'vue'

// 2 导入 App.vue 组件
import App from './App.vue'

// 导入 mui的样式
import './lib/mui/css/mui.css'
// 导入 购物车的小图标（注意：引入样式顺序的问题，先引入mui，再引入extra）
import './lib/mui/css/icons-extra.css'
// 导入自定义样式
import './assets/css/app.css'

// 导入 路由配置
// ./router 相当查找 ./router/index.js ，index.js 可以省略
import router from './router'

// 导入 mint-ui 组件
import { Header, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

// 3 渲染组件
const vm = new Vue({
  el: '#app',
  // 将路由与vue实例关联到一起
  router,
  render: c => c(App)
})