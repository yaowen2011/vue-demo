// 项目的入口js文件

// 1 导入vue
import Vue from 'vue'

// 导入 vuex
import store from './store'

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

// 设置请求公共路径：
// 配置以后，发送请求只需要使用当前接口地址即可，比如：
// 现在要请求：http://vue.studyit.io/api/getthumimages/${this.$route.params.id}
// 只需要使用：this.$http.get('api/getthumimages/${this.$route.params.id}')
axios.defaults.baseURL = 'http://vue.studyit.io'

// 注意：非vue的插件，都是以下这种使用方式！！！
// 将 axios 添加到 Vue 的原型对象中
Vue.prototype.$http = axios

// 导入 路由配置
// ./router 相当查找 ./router/index.js ，index.js 可以省略
import router from './router'

// 导入 mint-ui 组件
import { Header, Button, Swipe, SwipeItem, Lazyload, Toast, Switch } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Switch.name, Switch)
Vue.use(Lazyload)

// 导入 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 通过拦截器，实现每个请求发送前提示：数据正在加载中...
//                   请求成功以后，隐藏加载中提示

let toa
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 所有请求之前都要执行的操作
  // console.log('请求：', config);

  // 如果开启了 提示，那么就不会再次重复开启
  // 只有 get 请求，才会开启提示
  if (!toa && config.method === 'get') {
    toa = Toast({
      message: '数据加载中...',
      duration: -1
    });
  }

  return config;
}, function (error) {
  // 错误处理

  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 所有请求完成后都要执行的操作
  // console.log('响应：', response);

  // 避免代码报错，只有 toa 存在的时候，才关闭
  if (toa) {
    toa.close()
    toa = null
  }

  return response;
}, function (error) {
  // 错误处理
  return Promise.reject(error);
});

// 3 渲染组件
const vm = new Vue({
  el: '#app',
  // 将路由与vue实例关联到一起
  router,
  // 将状态管理与vue实例关联到一起
  store,
  render: c => c(App)
})