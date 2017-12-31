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
    <div class="comment">
      <h3 class="comment-header">发表评论</h3>
      <textarea cols="30" rows="3" placeholder="请输入评论内容，最多输入120字" v-model="content"></textarea>
      <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
      <ul class="comment-list">
        <li class="comment-item" v-for="(item, index) in list" :key="index">
          <div class="comment-item-header">
            <span>第{{ index + 1 }}楼</span>
            <span>用户：{{ item.user_name }}</span>
            <span>发表时间：{{ item.add_time | date }}</span>
          </div>
          <p>{{ item.content }}</p>
        </li>
      </ul>
      <mt-button type="primary" size="large" plain @click="loadMore" v-if="hasMoreData">加载更多</mt-button>
      <p v-else class="nomore">亲，没有更多评论数据了~</p>
    </div>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      // 新闻详情
      info: {},

      // 评论列表数据
      list: [],

      // 评论信息
      content: '',

      // 当前页
      curPage: 1,

      // 控制加载更多按钮的展示和隐藏
      hasMoreData: true
    }
  },

  // 钩子函数
  created() {
    this.getNewsInfoById()
    this.getComments()
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
          }
        })
    },

    // 加载评论数据
    getComments() {
      this.$http
        .get(`http://vue.studyit.io/api/getcomments/${this.$route.params.id}?pageindex=${this.curPage}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            // 因为加载更多功能，需要复用次方法，所以，这个地方不能再使用 赋值操作
            // 而是，将获取到的评论数据 与 当前评论数据合并到一起
            // this.list = data.message
            this.list = this.list.concat(data.message)

            // 根据返回数据的数量判断是否隐藏加载更多按钮
            if (data.message.length < 10) {
              this.hasMoreData = false
            }
          }
        })
    },

    // 发表评论
    sendComment() {
      if (this.content.trim() === '') {
        return
      }

      // 注意：post请求的参数，使用 content=评论内容 的形式
      this.$http
        .post(`http://vue.studyit.io/api/postcomment/${this.$route.params.id}`, `content=${this.content}`)
        .then(res => {
          // console.log(res);
          const data = res.data

          if (data.status === 0) {
            // 提交评论成功
            alert(data.message)

            // 注意：提交评论成功后，需要立即在第一条看到最新的评论数据
            // this.getComments()
            this.list.unshift({ add_time: new Date, content: this.content, user_name: 'jack' })
          }
        })
    },

    // 加载更多评论数据
    loadMore() {
      // 让当前页加1
      this.curPage++

      // 加载 curPage 页对应的数据
      this.getComments()
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
    border-bottom: 1px solid #ccc;

    img {
      width: 100%;
    }
  }
}

.comment {
  margin-bottom: 5px;

  .comment-header {
    margin-top: 20px;
  }

  .comment-list {
    list-style: none;
    margin: 0;
    padding: 0;

    .comment-item {
      font-size: 14px;
      margin-top: 5px;

      .comment-item-header {
        display: flex;
        justify-content: space-between;
        background-color: #eee;
        height: 26px;
        line-height: 26px;
      }

      p {
        color: #000;
        padding: 8px;
      }
    }
  }
  
  .nomore {
    text-align: center;
  }
}
</style>
