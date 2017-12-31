<template>
  <div class="newsinfo">
    <!-- 头部 -->
    <header class="header">
      <h2 v-text="info.title"></h2>
      <p>
        <span>发表时间：{{ info.add_time | date }}</span>
        <span>点击次数：{{ info.click }}次</span>
      </p>
    </header>

    <!-- 内容 -->
    <div class="content" v-html="info.content"></div>

    <!-- 评论 -->
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      // 新闻详情
      info: {}
    }
  },

  // 钩子函数
  created() {
    this.getNewsInfoById()
  },

  // 获取数据的方法
  methods: {
    getNewsInfoById() {
      this.$http
        .get(`http://vue.studyit.io/api/getnew/${this.$route.params.id}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            // 注意：当前接口返回的数据message是一个数组，详情信息是数组中的第一项
            this.info = data.message[0]
          }
        })
    }
  }
}
</script>

<style lang="scss">
.newsinfo {
  padding-left: 10px;
  padding-right: 10px;

  .header {
    border-bottom: 1px solid #ccc;

    h2 {
      font-size: 18px;
    }

    p {
      display: flex;
      justify-content: space-between;
    }
    span {
      color: #26a2ff;
    }
  }

  .content {
    padding-top: 10px;

    img {
      width: 100%;
    }
  }
}
</style>
