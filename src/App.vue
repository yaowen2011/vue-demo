<template>
  <div class="cms_container">
    <!-- App.vue 是项目的根组件，所有的内容，都展示在App.vue中 -->
    <mt-header title="黑马程序员 | SH16">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <!-- 路由出口 -->
    <router-view></router-view>

    <!-- 页脚 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/vip">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<!-- <span class="mui-icon mui-icon-email"> -->
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">9</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
  
</script>

<style>

</style>
