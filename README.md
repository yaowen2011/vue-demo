# Vue 项目

## 技术

```html
vue + axios + vue-router + vuex
UI库和组件库：MintUI + MUI
webpack + ES6
```

## 项目依赖

```html
---- 开发依赖 ----
npm i -D webpack webpack-dev-server html-webpack-plugin style-loader css-loader sass-loader node-sass url-loader file-loader babel-core babel-loader babel-preset-env vue-loader vue-template-compiler

组件按需加载插件
npm install babel-plugin-component -D

---- 项目依赖 ----
npm i -S vue vue-router axios mint-ui
npm i -S moment vue-preview vuex
```

## 项目功能

- 1 App组件（项目入口）搭建
  - header（mint-ui header组件）
  - footer（注意MUI样式覆盖的问题 - tabbar）
  - content（路由的使用，别忘了use注册路由）
- 2 首页
  - 轮播图（mint-ui Swipe）
  - 九宫格（mui grid-default 60px）
- 3 新闻咨询
  - 新闻列表（mui 中的 media-list）
  - 新闻详情
  - 评论
- 4 图片分享
  - 图片列表（mui tab-top-webview-main） http://dev.dcloud.net.cn/mui/ui/#scroll
  - 图片详情（mint-ui lazy-load）
  - 图片详情预览（npm i -S vue-preview）
- 5 商品购买
  - 商品列表
  - 商品详情（mui card、numbox）
- 6 购物车
  - 每个商品（card）
  - 开关（mint-ui switch）
  - 购物车商品总数 和 总价
  - 商品删除

```js
// 有利于开发期间定位错误信息
devtool: 'eval-source-map',
```

```css
/* 文字内容超过长度以后省略号显示 */
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```css
/*
  photo/List.vue 组件中使用mui scroll插件后，在Chrome浏览器中有警告提示
  参考这篇文章，查看原因：
  scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667

  解决方案：
*/

.mui-scroll {
  touch-action: none;
}
```

```js
// vue-router 编程式导航：
// https://router.vuejs.org/zh-cn/essentials/navigation.html
showInfo(id) {
  this.$router.push('/home/photoinfo/' + id)

  // name 是路由规则中的配置的name属性
  this.$router.push({ name: 'user', params: { userId: 123 }})
}
```

## 项目结构

```html
src\                项目源文件
  assets\           静态资源（样式、图片）
  components\       组件
  filters           过滤器
  lib\              用到的第三方包（例如：mui）
  router\           路由
  App.vue           项目根组件
  index.html        项目首页（SPA，唯一的页面）
  main.js           入口js文件（业务逻辑代码）
.babelrc            babel的配置文件
package-lock.json   npm 5.x以上下载包的lock文件，保证下载包的版本
package.json        项目描述文件
README.md           项目介绍以及功能实现步骤
webpack.config.js   webpack的配置文件
```

## 项目中路由的处理

- 只要是配置路由，那就到 `./src/router/index.js` 中进行配置

```html
为了让 入口文件（main.js） 结构看起来清晰，我们是将 路由的配置 封装到了一个独立js文件中（./src/router/index.js）

1 在 路由router/index.js 中导出：路由对象router
  export default router
2 在 mians.js 中 导入路由对象
  import router from './router/index.js'
```

## 项目中经常遇到的问题

- 1 样式覆盖，我们自己的样式应该在第三方库之后引入，才会覆盖第三方库的默认样式

## vue单文件组件

- 知道：`style` 和 `template` 都可以使用预编译器
- [Vue 单文件组件 预编译器文档](https://vue-loader.vuejs.org/zh-cn/configurations/pre-processors.html)

```html
<!-- 使用 pug 模板引擎 -->
<template lang="pug"></template>

<!-- 使用 SASS 预编译器 -->
<style lang="scss"></style>
```

## 添加一个新功能的步骤

- 1 创建这个组件（单文件组件）
- 2 配置路由
- 3 根据路由验证组件是否能够展示出来
- 4 如果有路由参数，需要到 router/index.js 中配置路由参数
- 5 把组件的基本结构和样式写好
- 6 发送请求获取数据，展示在组件中

## 编程式导航的使用

```html
<template>
  <a class="mui-tab-item" href="/home" @click="goPage('/home')">
    <span class="mui-icon mui-icon-home"></span>
    <span class="mui-tab-label">首页</span>
  </a>
</template>

<script>
export default {
  methods: {
    goPage(path) {
      // console.log(this);
      // 文档：https://router.vuejs.org/zh-cn/essentials/navigation.html

      // 实现编程式导航
      // path 表示要跳转的路径，与路由规则中的path想对应
      // name 表示路由的名称，与路由规则中的name想对应
      // params 表示路由参数
      // 调用 $router.push({ path: '/home' })
      // router.push({ name: 'user', params: { userId: 123 }})
      this.$router.push({ name: 'jack' })
    }
  }
}
</script>
```

## vue过渡效果

```html
<input type="button" value="toggle" @click="flag=!flag">
<transition
  @before-enter="beforeEnter"
  @enter="enter"
>
  <h3 v-show="flag" class="cls">Vue过渡效果</h3>
</transition>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      flag: false
    },
    methods: {
      // 入场动画之前，设置 元素的起始样式
      beforeEnter(el) {
        el.style.transition = 'all 1s ease'
        el.style.transform = 'translateY(30px)'
      },
      enter(el, done) {
        el.offsetWidth // 或者 写 el.offsetHeight
        // 为元素设置 进入完成之后的 样式
        el.style.transform = 'translateY(0px)'
        // 入场动画完成之后，立即 把 元素隐藏
        this.flag = !this.flag
      }
    }
  });
</script>
```
