<template>
  <div class="home">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000" :speed="500" :showIndicators="false">
      <mt-swipe-item v-for="(item, index) in list" :key="index">
        <img :src="item.img" :alt="item.url">
      </mt-swipe-item>
      <!-- <mt-swipe-item>
        <img src="http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="http://ofv795nmp.bkt.clouddn.com/vuelogobanner2-1.jpg" alt="">
      </mt-swipe-item> -->
    </mt-swipe>

    <!-- 九宫格菜单 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-1"></span>
          <div class="mui-media-body">新闻咨询</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
              <span class="mui-icon mui-icon-2"></span>
              <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <span class="mui-icon mui-icon-3"></span>
              <div class="mui-media-body">商品购买</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <span class="mui-icon mui-icon-4"></span>
              <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <span class="mui-icon mui-icon-5"></span>
              <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <span class="mui-icon mui-icon-6"></span>
              <div class="mui-media-body">联系我们</div></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  // 提供数据
  data() {
    return {
      // 轮播图数组
      list: []
    }
  },

  // 钩子函数
  created() {
    // 发送请求，获取数据
    // this 就是 Vue 的实例对象
    // console.log(this.$http);

    this.getLunbo()
  },

  methods: {
    // 用来获取轮播图数据
    getLunbo() {
      this.$http
        .get('http://vue.studyit.io/api/getlunbo')
        .then(res => {
          // console.log(res);
          const data = res.data
          // 只有 status 为0，那么才表示数据请求成功
          if (data.status === 0) {
            this.list = data.message
          }
        })
    }
  }
}
</script>

<style lang="scss">
  /* 
    style的lang属性 用来指定使用哪个预编译的CSS
    lang="scss" 表示使用 SASS 中的 scss 语法格式
    lang="less" 表示使用 LESS 的语法

    参考文档：
    https://vue-loader.vuejs.org/zh-cn/configurations/pre-processors.html
  */
  .mint-swipe {
    height: 180px;
  }

  .mint-swipe-item img {
    width: 100%;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: 0;

    .mui-table-view-cell {
      border: 0;
    }
  }
  .mui-icon {
    width: 60px;
    height: 60px;
    background-size: cover;
  }
  .mui-icon-1 {
    background-image: url(../../assets/image/menu1.png)
  }
  .mui-icon-2 {
    background-image: url(../../assets/image/menu2.png)
  }
  .mui-icon-3 {
    background-image: url(../../assets/image/menu3.png)
  }
  .mui-icon-4 {
    background-image: url(../../assets/image/menu4.png)
  }
  .mui-icon-5 {
    background-image: url(../../assets/image/menu5.png)
  }
  .mui-icon-6 {
    background-image: url(../../assets/image/menu6.png)
  }
</style>
