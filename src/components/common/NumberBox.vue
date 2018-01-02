<template>
  <div class="num-box">
    <button type="button" class="num-btn num-btn-minus" @click="minus">-</button> 
    <input type="number" :value="num" class="num-input-numbox">
    <button type="button" class="num-btn num-btn-plus" @click="plus">+</button>
  </div>
</template>

<script>
export default {
  // value 是自动传递的属性
  props: ['value', 'max'],

  data() {
    return {
      // 将 value（父组件中传递过来的值）交给 num 属性
      num: this.value
    }
  },

  methods: {
    // -
    minus() {
      // console.log('-');
      if (this.num <= 1) {
        return
      }

      this.num--

      // input 事件也是自动传递进来的，我们通过 $emit() 来触发这个事件，将num的最新值传递给父组件
      this.$emit('input', this.num)
    },

    // +
    plus() {
      // console.log('+');
      if (this.num >= this.max) {
        return
      }

      this.num++
      this.$emit('input', this.num)
    }
  }
}
</script>

<style scoped lang="scss">
// scoped 属性，用来设置当前样式，只对当前组件起作用！！！

.num-box {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 120px;
  height: 25px;
  padding: 0 40px 0 40px;
  vertical-align: top;
  vertical-align: middle;
  border: solid 1px #bbb;
  border-radius: 3px;
  background-color: #efeff4;

  [disabled] {
    color: #c0c0c0;
  }

  .num-btn {
    font-size: 18px;
    font-weight: normal;
    line-height: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 40px;
    height: 100%;
    padding: 0;
    color: #555;
    border: none;
    border-radius: 0;
    background-color: #f9f9f9;
  }

  .num-btn-minus {
    left: 0;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .num-btn-plus {
    right: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .num-input-numbox {
    display: inline-block;
    overflow: hidden;
    width: 100% !important;
    height: 100%;
    margin: 0;
    padding: 0 3px !important;
    text-align: center;
    text-overflow: ellipsis;
    word-break: normal;
    border: none !important;
    border-right: solid 1px #ccc !important;
    border-left: solid 1px #ccc !important;
    border-radius: 0 !important;
  }
}
</style>
