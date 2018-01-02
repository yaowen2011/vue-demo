<template>
  <div class="goods-list">
    <ul>
      <li class="goods-item" v-for="item in list" :key="item.id" @click="goInfo(item.id)">
        <img :src="item.img_url" alt="">
        <h2>{{ item.title }}</h2>
        <div>
          <span class="price-cur">￥{{ item.sell_price }}</span>
          <span class="price-prev">￥{{ item.market_price }}</span>
        </div>
        <p>
          <span>热卖中</span>
          <span>剩余{{ item.stock_quantity }}件</span>
        </p>
      </li>
    </ul>

    <!-- 加载更多 -->
    <mt-button plain size="large" type="primary" v-if="hasMore" @click="loadMore">加载更多</mt-button>
    <p v-else class="more">亲，没有更多商品了~</p>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      // 商品数组
      list: [],
      // 当前页
      curPage: 1,
      // 标识，是否有更多数据
      hasMore: true
    }
  },

  // 钩子
  created() {
    this.getGoods()
  },

  // 方法
  methods: {
    // 获取商品列表数据
    getGoods() {
      this.$http
        .get(`api/getgoods?pageindex=${this.curPage}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            // this.list = this.list.concat(data.message)
            this.list = [...this.list, ...data.message]

            if (data.message.length < 10) {
              this.hasMore = false
            }
          }
        })
    },

    // 加载更多数据
    loadMore() {
      this.curPage++

      this.getGoods()
    },

    // 跳转到详情页面
    goInfo(id) {
      this.$router.push({ name: 'goodsinfo', params: { id } })
    }
  }
}
</script>

<style lang="scss">
  .goods-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .goods-item {
      width: 48%;
      margin: 1%;
      padding: 3px;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;

      h2 {
        font-size: 14px;
        // 多行溢出隐藏，使用省略号代替
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      div {
        font-size: 14px;
        margin-top: 5px;

        .price-cur {
          color: #f00;
          margin-right: 10px;
        }
        .price-prev {
          text-decoration: line-through;
          color: #ccc;
        }
      }

      img {
        width: 100%;
      }

      p {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0 3px;
        color: #ccc;
      }
    }

    .more {
      text-align: center;
    }
  }
</style>
