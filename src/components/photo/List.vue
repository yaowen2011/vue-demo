<template>
  <div>
    <div class="mui-slider mui-fullscreen">
			<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
          <!-- :class="{}" 动态添加类 -->
          <a href="#" class="mui-control-item" :class="{ 'mui-active': item.id === 0 }" v-for="item in catList" :key="item.id">
						{{ item.title }}
					</a>
        </div>
			</div>
		</div>

		<!-- 图片列表 -->
		<ul class="category-img-list">
      <li class="img-list-item">
        <img src="http://vue.studyit.io/upload/201504/18/thumb_201504181230434303.jpg" lazy="loaded"> 
        <div>
          <h2>现代简约 明亮的外表卧室卧室背景墙、吊顶黄色</h2>
          <p>不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计，欧式卧室飘窗装修效果图。</p>
        </div>
      </li>
      <li class="img-list-item">
        <img src="http://vue.studyit.io/upload/201504/18/thumb_201504181237019134.jpg" lazy="loaded"> 
        <div>
          <h2>很美的落地大书柜 可以放超多的图书的吧</h2> 
          <p>很美的落地大书柜 可以放超多的图书的吧，转角的书柜以及书桌，这里可以收纳超多的东西，书柜,书桌这些是&amp;quot;七彩人生&amp;quot;品，双层书柜组合书柜儿童书柜。</p>
        </div>
      </li>
      <li class="img-list-item">
        <img src="http://vue.studyit.io/upload/201504/18/thumb_201504181241259978.jpg" lazy="loaded"> 
        <div>
          <h2>西班牙阿拉尔孔郊区的80平米一室一厅的公寓</h2>
          <p>这是一套在西班牙阿拉尔孔郊区的80平米一室一厅的公寓，用一道墙分隔出了客厅与厨房，虽然整体来看室内设计有些混搭风，但似乎某些空间和角度去看又会有着自己的主题。</p>
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
      catList: []
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
  },

  // 方法
  methods: {
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
    }
  }
}
</script>

<style lang="scss">
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
