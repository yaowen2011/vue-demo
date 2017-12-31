<template>
  <div class="news">
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
        <a class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h3 class="text title" v-text="item.title"></h3>
            <p class="mui-ellipsis">
              <span>发表时间：{{ item.add_time | date }}</span>
              <span>点击次数：{{ item.click }}次</span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      // 新闻列表数据
      list: []
    }
  },

  // 钩子函数
  created() {
    // 获取新闻列表数据
    this.getNewsList()
  },

  // 发送请求的方法
  methods: {
    getNewsList() {
      this.$http
        .get('http://vue.studyit.io/api/getnewslist')
        .then(res => {
          // console.log(res);
          const data = res.data

          if (data.status === 0) {
            this.list = data.message
          }
        })
    }
  }
}
</script>

<style lang="scss">
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title {
  font-size: 16px;
  font-weight: 400;
}

.mui-ellipsis {
  display: flex;
  justify-content: space-around;

  span {
    color: #26a2ff;
    font-size: 12px;
  }
}

.mui-table-view-chevron .mui-table-view-cell {
  padding-right: 55px;
}

.mui-table-view-cell {
  padding: 11px 15px 8px 15px;
}
</style>
