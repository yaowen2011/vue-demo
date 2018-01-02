import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 导入 自定义组件
import Home from '../components/home/Home.vue'
import Vip from '../components/vip/Vip.vue'
import Cart from '../components/cart/Cart.vue'
import Search from '../components/search/Search.vue'

// 新闻组件
import NewsList from '../components/news/List.vue'
import NewsInfo from '../components/news/Info.vue'

// 图片分享
import PhotoList from '../components/photo/List.vue'
import PhotoInfo from '../components/photo/Info.vue'

// 商品购买
import GoodsList from '../components/goods/List.vue'
import GoodsInfo from '../components/goods/Info.vue'
import GoodsDetails from '../components/goods/Details.vue'

// 安装路由插件
Vue.use(VueRouter)

// 创建路由实例
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, name: 'jack' },
    { path: '/vip', component: Vip },
    { path: '/cart', component: Cart },
    { path: '/search', component: Search },
    
    // 新闻模块：列表和详情
    // 加入 /home 的目的是为：跳转到新闻模块后，还能让底部首页菜单高亮
    { path: '/home/newslist', component: NewsList },
    // :id 是路由参数，用来获取不同新闻的id
    { path: '/home/newsinfo/:id', component: NewsInfo },

    // 图片分享模块
    { path: '/home/photolist', component: PhotoList },
    // name 用来配合编程式导航实现带有参数的路由跳转
    { path: '/home/photoinfo/:id', component: PhotoInfo, name: 'photoinfo' },

    // 商品购买
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo },
    { path: '/home/goodsdetail', component: GoodsDetails },
  ],

  // 修改默认高亮类名为mui的高亮类名
  // 将来切换菜单的时候，当前菜单会展示高亮效果（高亮效果是由mui提供的）
  linkActiveClass: 'mui-active'
})

// 导出路由对象
export default router