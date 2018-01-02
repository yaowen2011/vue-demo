<template>
  <div>
    <div class="mui-slider mui-fullscreen">
			<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
          <!-- :class="{}" 动态添加类 -->
          <a href="#" class="mui-control-item" :class="{ 'mui-active': item.id === 0 }" v-for="item in catList" :key="item.id" @click="getImagesList(item.id)">
						{{ item.title }}
					</a>
        </div>
			</div>
		</div>

		<!-- 图片列表 -->
		<ul class="category-img-list">
      <li class="img-list-item" v-for="item in imagesList" :key="item.id">
        <!-- v-lazy 是一个自定义指令，由 mint-ui提供，用来实现图片懒加载 -->
        <img v-lazy="item.img_url"> 
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.zhaiyao }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 导入 mui.js 
import mui from '../../lib/mui/js/mui'
// import '../../lib/mui/js/mui'

export default {
  // 数据
  data() {
    return {
      // 分类列表
      catList: [],
      // 图片列表数据
      imagesList: []
    }
  },

  // 钩子
  mounted() {
    // 只有在 mounted 钩子函数中，才能够进行DOM操作
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005
    })

    // 获取分类列表数据
    this.getCategoryList()
    // 获取图片列表
    this.getImagesList()
  },

  // 方法
  methods: {
    // 获取分类数据
    getCategoryList() {
      this.$http
        .get('http://vue.studyit.io/api/getimgcategory')
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            // 在第一个数据之前，添加一个全部菜单
            data.message.unshift({id: 0, title: '全部'})
            this.catList = data.message
          }
        })
    },

    // 获取图片列表数据
    getImagesList(id = 0) {
      this.$http
        .get(`http://vue.studyit.io/api/getimages/${id}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            this.imagesList = data.message
          }
        })
    }
  }
}
</script>

<style lang="scss">
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.mui-slider-indicator.mui-segmented-control {
  background-color: #fff;
}

.mui-fullscreen {
  position: fixed;
  top: 40px;
  height: 38px;
}

/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}

.category-img-list {
  list-style: none;
  padding: 5px;
  padding-top: 30px;

  .img-list-item {
    position: relative;
    margin-bottom: 5px;

    div {
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;

      h2 {
        font-size: 16px;
      }

      p {
        color: #fff;
        margin-bottom: 0px;
      }
    }

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
