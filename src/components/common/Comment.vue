<template>
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
</template>

<script>
// 导入 提示组件
import { Toast } from 'mint-ui'

export default {
  // 接受父组件传递进来的数据
  props: ['commentId'],

  // 数据
  data() {
    return {
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

  // 钩子
  // 什么情况下钩子函数中的请求会触发？？？
  // 第一次进入页面，commentId值为undefined，所以，不会执行
  // 当我们修改代码，webpack执行代码热更新，会重新渲染组件，此时，commentId 已经获取到，所以，会执行created钩子中的代码逻辑
  created() {
    // 判断有没有 commentId ，如果有 commentId 我们才会发送请求获取数据
    if (this.commentId) {
      this.getComments()
    }
  },

  // 监视数据变化
  // 只有当数据变化为正确的id值，那么钩子函数才会执行！！！
  // 当 commentId 的值由 undefined -> 14（正确值），此时，watch就监视到这个变化，发送请求获取数据
  watch: {
    commentId(curVal) {
      // console.log(curVal);
      this.getComments()
    }
  },

  // 方法
  methods: {
    // 加载评论数据
    getComments() {
      this.$http
        .get(`http://vue.studyit.io/api/getcomments/${this.commentId}?pageindex=${this.curPage}`)
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
        return Toast({
          message: '请输入评论内容',
          duration: 2000
        });
      }

      // 注意：post请求的参数，使用 content=评论内容 的形式
      this.$http
        .post(`http://vue.studyit.io/api/postcomment/${this.commentId}`, `content=${this.content}`)
        .then(res => {
          // console.log(res);
          const data = res.data

          if (data.status === 0) {
            // 提交评论成功
            // alert(data.message)
            Toast({
              message: data.message,
              duration: 1000
            })
            // 注意：提交评论成功后，需要立即在第一条看到最新的评论数据
            // this.getComments()
            this.list.unshift({ add_time: new Date, content: this.content, user_name: 'jack' })
            this.content = ''
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
