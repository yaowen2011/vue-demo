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
    <!-- 
      注意：info.id 是通过ajax异步请求获取的数据，当渲染组件的时候，ajax请求还没有完成，那么此时，info.id 就是 undefined

      如何做到获取到数据了，再传递info.id？？？
      1 添加 isLoaded 数据，并且默认值为：false
      2 给评论组件添加 v-if="isLoaded" ，那么，当 isLoaded 的值为false，组件是不会渲染的
      3 当数据获取到以后，将 isLoaded 的值设置为：true
      4 因为数据发生改变，页面结构就会被重新渲染，此时，评论组件才渲染到页面中，并且此时的 info.id 已经获取到，再传递给组件，就没问题了
    -->
    <!-- <Comment v-if="isLoaded" :commentId="info.id"></Comment> -->

    <!-- 思路2：由 评论组件 自己通过 watch监视数据变化 处理 -->
    <Comment :commentId="info.id"></Comment>
  </div>
</template>

<script>
// 导入 评论组件
import Comment from '../common/Comment.vue'

export default {
  // 数据
  data() {
    return {
      // 新闻详情
      info: {},

      // 数据是否加载完成
      isLoaded: false
    }
  },

  // 钩子函数
  created() {
    this.getNewsInfoById()
  },

  // 获取数据的方法
  methods: {
    // 加载新闻详情信息
    getNewsInfoById() {
      this.$http
        .get(`http://vue.studyit.io/api/getnew/${this.$route.params.id}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            // 注意：当前接口返回的数据message是一个数组，详情信息是数组中的第一项
            this.info = data.message[0]
            this.isLoaded = true
          }
        })
    },
  },

  // 注册组件
  // 引入的组件，只有被注册为当前组件的 components 后，才能在 template 中使用
  components: {
    Comment
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
    border-bottom: 1px solid #ccc;

    img {
      width: 100%;
    }
  }
}
</style>
