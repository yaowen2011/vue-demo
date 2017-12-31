// 创建一个全局过滤器，来格式化日期
import moment from 'moment'
import Vue from 'vue'

// 注册全局过滤器
// filter方法的参数：
//  第一个参数：表示过滤器名称
//  第二个参数：是一个回调函数，当使用过滤器的时候，这个回调函数会执行

// 回调函数的参数：
//  第一个参数表示: 要格式化的内容
//  第二个参数表示: 用户使用过滤器的时候, 传入的格式
//     因为 format参数 是可选的, 所以, 我们采用了ES6中的默认参数, 来初始化默认值
Vue.filter('date', function (input, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(input).format(format)
})