<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart" v-for="item in list" :key="item.id">
          <mt-switch v-model="item.isChecked"></mt-switch>
          <img :src="item.thumb_path" alt="">
          <div>
            <h2>{{ item.title }}</h2>
            <div class="info">
              <span>￥{{ item.sell_price }}</span>
              <NumberBox v-model="item.count"></NumberBox>
              <a href="javascript:;" @click="del(item.id)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart-buy">
          <div>
            <p>总计（不包含运费）</p>
            <p>已勾选商品&nbsp;
              <span>{{ $store.getters.cartCount }}</span>&nbsp;件&nbsp;&nbsp;总价：
              <span>￥{{ totalPrice }}</span></p>
          </div>
          <div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 NumberBox 组件
import NumberBox from '../common/NumberBox.vue'

export default {
  // 数据
  data() {
    return {
      list: []
    }
  },

  // 钩子
  created() {
    this.getCartList()
  },

  // 方法
  methods: {
    getCartList() {
      const ids = this.$store.getters.ids
      if (ids === '') return

      const getCountById = this.$store.getters.getCountById
      this.$http
        .get(`api/goods/getshopcarlist/${ids}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            // this.list = data.message
            // 为了监视到商品数量的改变, 我们给每一个商品对象, 添加一个 count 属性
            data.message.forEach(item => {
              item.count = getCountById[item.id]
              // 控制每个商品的选中状态
              item.isChecked = true
            })

            this.list = data.message

            // this.list = data.message.map(item => {
            //   return {...item, count: getCountById[item.id]}
            // })
          }
        })
    },

    // 根据id删除商品
    del(id) {
      this.list.some((item, index) => {
        if (item.id === id) {
          this.list.splice(index, 1)
          return true
        }
      })
    }
  },

  // 监视数据变化
  // 思路: 监视购物车中数据(- / + / 删除 / 开关)的变化, 只要数据发生了改变, 就将最新的购物车数据存储到vuex中
  watch: {
    list: {
      handler(curVal) {
        console.log(1);
        // console.log('list中的数据变化了额');
        this.$store.commit('updateCart', curVal)
      },
      deep: true
    }
  },

  // 计算属性
  // 获取总价个
  computed: {
    totalPrice() {
      let total = 0
      this.list.forEach(item => {
        if (item.isChecked) {
          total += item.count * item.sell_price
        }
      })
      return total
    }
  },
  
  components: { NumberBox }
}
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  align-items: center;

  h2 {
    font-size: 14px;
  }

  img {
    width: 60px;
    height: 60px;
  }

  span {
    color: #f00;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.cart-buy {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #f00;
  }
}
</style>
