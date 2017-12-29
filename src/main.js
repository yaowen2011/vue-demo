// 项目的入口js文件

// 1 导入vue
import Vue from 'vue'

// 2 导入 App.vue 组件
import App from './App.vue'

// 3 渲染组件
const vm = new Vue({
  el: '#app',
  render: c => c(App)
})