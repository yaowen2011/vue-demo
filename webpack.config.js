const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  entry: path.join(__dirname, './src/main.js'),

  // 出口
  output: {
    // 打包后的文件输出目录
    path: path.join(__dirname, './dist'),
    // 打包后js文件的名称
    filename: 'bundle.js'
  },

  // 准确定位开发期间的错误
  devtool: 'eval-source-map',

  // 服务器
  devServer: {
    open: true,
    port: 3000,
  },

  // 处理静态资源
  module: {
    rules: [
      // 处理 css
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // 处理 sass
      { test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      // 处理 图片
      { 
        test: /\.(jpe?g|png|gif|bmp|webp)$/, 
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },
      // 处理 字体
      { test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'file-loader' },
      // 处理 js的新语法
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      // 处理 vue单文件组件
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html')
    })
  ]
}
