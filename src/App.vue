<template>
  <div class="cms_container">
    <!-- App.vue 是项目的根组件，所有的内容，都展示在App.vue中 -->
    <mt-header fixed title="黑马程序员 | SH16">
			<!-- $router.go(-1) 通过编程式导航，实现返回上一页 -->
			<!-- $route.path 表示当前路径 -->
      <a href="javascript:;" slot="left" @click="$router.go(-1)" v-show="$route.path !== '/home'">
        <mt-button icon="back">返回</mt-button>
      </a>
    </mt-header>

    <!-- 路由出口 -->
    <router-view class="content"></router-view>

    <!-- 页脚 -->
    <nav class="mui-bar mui-bar-tab">
			<!-- 给组件添加事件，需要指定 .native 事件修饰符 -->
			<router-link class="mui-tab-item" to="/home" @click.native="goPage('/home')">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/vip" @click.native="goPage('/vip')">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart" @click.native="goPage('/cart')">
				<!-- <span class="mui-icon mui-icon-email"> -->
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{ $store.getters.cartCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search" @click.native="goPage('/search')">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
  export default {
		methods: {
			goPage(path) {
				// path 表示要跳转到的路径
				// 通过编程式导航实现路由的跳转
				this.$router.push({ path: path })
			}
		}
	}
</script>

<style>
/* 
	内容被头部和底部导航“吃掉”，也就是固定定位脱标覆盖内容
	解决：只需要添加 padding 将上下两个区域空出来即可
*/
.content {
	padding: 40px 0 50px;
}
</style>
