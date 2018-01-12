const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
// 分离 css 到独立的文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 压缩 css 资源文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  // 入口
  // 注意：将 entry 的值设置为对象后，对象中的每一个键，就是一个独立的入口
  // 比如：现在这个配置中有两个入口：1 app 2 vendor
  entry: {
    // app 是我们自己写的代码的入口
    main: path.join(__dirname, './src/main.js'),

    // vendor 是第三方包的入口
    vendor: ['vue', 'vue-router', 'vuex', 'axios', 'mint-ui', 'moment', 'vue-preview']
  },

  // 出口
  output: {
    // 打包后的文件输出目录
    path: path.join(__dirname, './dist'),
    // 打包后js文件的名称
    // js 表示输出文件夹名称
    // [name] 表示保持入口文件名称，比如：app / vendor
    // [chunkhash] 随机生成的哈希值
    filename: 'js/[name].[chunkhash:10].js',
    // 设置文件公共路径
    publicPath: '/',
    // 指定代码分离功能生成文件的名称
    chunkFilename: 'js/[name].[chunkhash].js',
  },

  // 处理静态资源
  module: {
    rules: [
      // 处理 css
      { 
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // 处理 sass
      { 
        test: /\.(sass|scss)$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      },
      // 处理 图片
      {
        test: /\.(jpe?g|png|gif|bmp|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 7168,
            name: 'image/[hash:10].[ext]'
          }
        }
      },
      // 处理 字体
      { 
        test: /\.(eot|svg|ttf|woff|woff2)$/, 
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash:10].[ext]'
          }
        }
      },
      // 处理 js的新语法
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      // 处理 vue-preview 创建中的ES6代码
      // 原因：ES6的代码是无法被 uglifyjs 压缩的，可以通过babel将这些ES6代码转化为ES5后，再打包就可以了
      { test: /vue-preview.src.*?js$/, use: 'babel-loader' },
      // 处理 vue单文件组件
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),

      // 压缩HTML
      minify: {
        // 移除空白
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
        // 移除属性中的双引号
        removeAttributeQuotes: true
      }
    }),

    // 自动删除 dist 目录
    // 参数是一个数组，数组中的每一项表示要删除文件的路径
    new cleanWebpackPlugin(['./dist']),

    // 3 抽离第三方包
    new webpack.optimize.CommonsChunkPlugin({
      // 将 entry 中指定的 ['vue', 'vue-router', 'axios'] 打包到名为 vendor 的js文件中
      // 第三方包入口名称，对应 entry 中的 vendor 属性
      name: 'vendor',
    }),

    // 压缩代码
    // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/v0.4.6
    new webpack.optimize.UglifyJsPlugin({
      // 压缩
      compress: {
        // 移除警告
        warnings: false
      }
    }),

    // 指定环境为生产环境：vue会根据这个环境来自动切换到适合生产环境中使用的vue文件
    // 简单理解：
    //  开发环境：vue.js
    //  生成环境：vue.min.js
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // 抽离CSS，指定css输出的文件路径
    new ExtractTextPlugin('css/style.css'),
    // 抽离css 的辅助压缩插件
    new OptimizeCssAssetsPlugin()
  ]
}
