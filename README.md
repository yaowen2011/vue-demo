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
