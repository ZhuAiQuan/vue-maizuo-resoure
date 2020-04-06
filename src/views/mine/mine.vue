<template>
  <div class="content-mine">
    <div class="head">
      <van-image
        round
        width="63px"
        height="63px"
        :src="avatar"
      />
      <div class="text" @click="toLogin">立即登录</div>
    </div>
    <div class="order">
      <div class="left" @click="toLogin">
        <van-image
          :src="order"
        />
        <div class="text">电影订单</div>
      </div>
      <div class="right" @click="toLogin">
        <van-image
          :src="store"
        />
        <div class="text">商品订单</div>
      </div>
    </div>
    <div class="set">
      <van-cell title="卖座券" is-link icon="coupon-o" @click="toLogin"/>
      <van-cell title="组合红包" is-link icon="bill-o" @click="toLogin"/>
      <van-cell title="余额" is-link value="￥0" icon="refund-o" @click="toLogin"/>
      <van-cell title="设置" is-link icon="setting-o" @click="toLogin"/>
    </div>
  </div>
</template>

<script>
import avatar from '../../assets/images/avatar.png'
import order from '../../assets/images/order.png'
import store from '../../assets/images/store.png'
export default {
  data () {
    return {
      avatar,
      order,
      store
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.content-mine{
  margin-bottom: 60px;
  background: rgb(244, 244, 244);
  .head{
    height: 200px;
    padding-left: 22px;
    padding-top: 64px;
    margin-top: -44px;
    background: url(https://assets.maizuo.com/h5/v5/public/app/img/bg.6837f67.png);
    background-size: cover;
    display: flex;
    align-items: center;
    /deep/.van-image{
      margin-right: 20px;
    }
    .text{
      font-size: 16px;
      color: #fff;
    }
  }
  .order{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    align-items: center;
    height: 79px;
    background: #fff;
    font-size: 13px;
    .left,.right{
      width: 50%;
      cursor: pointer;
      .text{
        color: #797d82;
      }
      /deep/.van-image{
        width: 26px;
        height: 26px;
      }
    }
  }
  .set{
    /deep/.van-cell__title{
      text-align: left;
    }
  }
}
</style>
