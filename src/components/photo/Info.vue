<template>
  <div class="photo-info">
    <header>
      <h2 class="title" v-text="imgInfo.title"></h2>
      <p class="mui-ellipsis">
        <span>发表时间：{{ imgInfo.add_time | date }}</span>
        <span>点击次数：{{ imgInfo.click }}次</span>
      </p>
    </header>
    <div class="thumb-img">
      <!-- 图片预览插件 -->
      <img class="preview-img" v-for="(item, index) in thumImgList" :src="item.src" height="100" @click="$preview.open(index, thumImgList)" :key="index">
    </div>
    <div class="content" v-html="imgInfo.content"></div>

    <!-- 评论组件 -->
    <Comment :commentId="imgInfo.id"></Comment>
  </div>
</template>

<script>
import Comment from '../common/Comment.vue'

export default {
  // 数据
  data() {
    return {
      // 图片的详情数据
      imgInfo: {},
      // 图片缩略图数组
      thumImgList: []
    }
  },

  // 钩子
  created() {
    this.getImgInfo()
    this.getThumImgList()
  },
  
  // 获取数据方法
  methods: {
    // 获取新闻详情
    getImgInfo() {
      this.$http
        .get(`http://vue.studyit.io/api/getimageInfo/${this.$route.params.id}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            this.imgInfo = data.message[0]
          }
        })
    },

    // 获取图片缩略图
    getThumImgList() {
      this.$http
        .get(`api/getthumimages/${this.$route.params.id}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            // this.thumImgList = data.message
            // 因为 图片预览插件需要每个图片对象中都有 w 和 h 这两个属性，所以，我们先给每一个数据添加 w 和 h，然后，再把数据交给 thumImgList

            this.thumImgList = data.message.map(item => ({
              src: item.src,
              w: 600,
              h: 400
            }))
          }
        })
    }
  },

  components: {Comment}
}
</script>

<style lang="scss">
.photo-info {
  padding-left: 3px;
  padding-right: 3px;

  .thumb-img {
    border-top: 1px solid #ccc;

    img {
      margin: 9px;
      box-shadow: 0 0 15px #ccc;
    }
  }

  .title {
    font-size: 18px;
    color: #26a2ff;
    text-align: center;
  }

  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
    padding: 0 3px;
  }

  .content {
    font-size: 14px;
    line-height: 28px;
    padding-top: 20px;
  }
}
</style>
