# 项目的说明

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