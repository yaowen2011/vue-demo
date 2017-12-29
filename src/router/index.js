import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 导入 自定义组件
import Home from '../components/home/Home.vue'
import Vip from '../components/vip/Vip.vue'
import Cart from '../components/cart/Cart.vue'
import Search from '../components/search/Search.vue'

// 安装路由插件
Vue.use(VueRouter)

// 创建路由实例
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/vip', component: Vip },
    { path: '/cart', component: Cart },
    { path: '/search', component: Search },
  ],

  // 修改默认高亮类名为mui的高亮类名
  // 将来切换菜单的时候，当前菜单会展示高亮效果（高亮效果是由mui提供的）
  linkActiveClass: 'mui-active'
})

// 导出路由对象
export default router