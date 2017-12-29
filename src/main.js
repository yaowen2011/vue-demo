// 项目的入口js文件

// 1 导入vue
import Vue from 'vue'

// 2 导入 App.vue 组件
import App from './App.vue'

// 导入 路由配置
// ./router 相当查找 ./router/index.js ，index.js 可以省略
import router from './router'

// 3 渲染组件
const vm = new Vue({
  el: '#app',
  // 将路由与vue实例关联到一起
  router,
  render: c => c(App)
})