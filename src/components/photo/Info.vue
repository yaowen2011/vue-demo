<template>
  <div class="photo-info">
    <header>
      <h2 class="title">现代简约 明亮的外表卧室卧室背景墙、吊顶黄色</h2>
      <p class="mui-ellipsis">
        <span>发表时间：2015-04-18 12:30:50</span>
        <span>点击次数：0次</span>
      </p>
    </header>
    <div class="thumb-img">
      <img src="http://vue.studyit.io/upload/201504/18/thumb_201504181230434303.jpg" height="100" class="preview-img">
      <img src="http://vue.studyit.io/upload/201504/18/thumb_201504181230437111.jpg" height="100" class="preview-img">
      <img src="http://vue.studyit.io/upload/201504/18/thumb_201504181230439139.jpg" height="100" class="preview-img">
    </div>
    <div class="content">
      不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计
    </div>
  </div>
</template>

<script>
export default {

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
