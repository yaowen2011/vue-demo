// 项目的入口js文件

// 1 导入vue
import Vue from 'vue'

// 导入 moment 包(处理时间的包)
// 文档：http://momentjs.cn/docs/#/parsing/
// import moment from 'moment'
// moment的参数表示：要格式化的日期
// format() 方法：用来格式化日期，参数表示：输入的日期格式
// console.log( moment('2015-04-16T03:50:28.000Z').format('YYYY-MM-DD') );

// 导入 日期过滤器
// 因为 过滤器date.js 中没有导出任何内容，所以，我们只需要将js文件导入即可，不需要导入任何的对象
import './filters/date'

// 2 导入 App.vue 组件
import App from './App.vue'

// 导入 mui的样式
import './lib/mui/css/mui.css'
// 导入 购物车的小图标（注意：引入样式顺序的问题，先引入mui，再引入extra）
import './lib/mui/css/icons-extra.css'
// 导入自定义样式
import './assets/css/app.css'

// 导入 axois 发送ajax请求
import axios from 'axios'
// 注意：非vue的插件，都是以下这种使用方式！！！
// 将 axios 添加到 Vue 的原型对象中
Vue.prototype.$http = axios

// 导入 路由配置
// ./router 相当查找 ./router/index.js ，index.js 可以省略
import router from './router'

// 导入 mint-ui 组件
import { Header, Button, Swipe, SwipeItem, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(Lazyload)

// 导入 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 3 渲染组件
const vm = new Vue({
  el: '#app',
  // 将路由与vue实例关联到一起
  router,
  render: c => c(App)
})