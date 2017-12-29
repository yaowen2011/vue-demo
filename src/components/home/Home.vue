<template>
  <div class="home">
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
  </div>
</template>

<script>
export default {
  // 提供数据
  data() {
    return {
      list: []
    }
  },

  // 钩子函数
  created() {
    // 发送请求，获取数据
    // this 就是 Vue 的实例对象
    // console.log(this.$http);

    this.$http
      .get('http://vue.studyit.io/api/getlunbo')
      .then(res => {
        // console.log(res);
        const data = res.data
        if (data.status === 0) {
          this.list = data.message
        }
      })
  }
}
</script>

<style>
  .mint-swipe {
    height: 180px;
  }

  .mint-swipe-item img {
    width: 100%;
  }
</style>
