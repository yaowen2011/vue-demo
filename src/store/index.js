// 1 导入vue
import Vue from 'vue'

// 导入 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 进入页面, 从localStorage 中取出购物车数据
const cart = JSON.parse(localStorage.getItem('cart')) || []

const store = new Vuex.Store({
  // 数据：
  // 存储购物车中的数据
  state: {
    cart
    // cart: []

    // 购物车的数据格式：
    // cart: [
    //   { id: 83, count: 2 },
    //   { id: 84, count: 3 },
    //   { id: 85, count: 2 },
    // ]
  },

  mutations: {
    addCart(state, payload) {
      // 如果这个商品没有添加过购物车，那么，直接push到cart中即可
      // 如果这个商品已经在购物车中，那么，应该找到这个商品，并且修改其count值

      // payload : { id: 85, count: 1 }
      const temp = state.cart.filter(item => item.id === payload.id)
      if (temp.length === 0) {
        // 没有
        state.cart.push(payload)
      } else {
        // 有
        temp[0].count += payload.count
      }

      // 存储到localStorage中
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    // 更新数据
    updateCart(state, payload) {
      // payload 就是 购物车中获取到的数组

      // state.cart = payload
      state.cart = payload.map(item => {
        if (item.isChecked) {
          return { id: item.id, count: item.count }
        } else {
          return { id: item.id, count: 0 }
        }
      })

      // 存储到localStorage中
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },

  getters: {
    // 购物车中商品的数量
    cartCount(state) {
      let total = 0
      state.cart.forEach(item => {
        total += item.count
      })
      return total
    },

    // 用来获取购物车中所有商品id
    ids(state) {
      return state.cart.map(item => item.id).join(',')
    },

    // 根据id查找count
    getCountById(state) {
      // 返回一个对象,对象的键为 商品id,值为 商品数量
      // { 87: 2, 92: 3 }
      const temp = {}
      state.cart.forEach(item => {
        temp[item.id] = item.count
      })
      return temp
    }
  }
})

export default store