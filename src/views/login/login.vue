<template>
  <div class="login">
    <div>
      <van-image
        :src="logo"
        height="60px"
        width="60px"
      />
    </div>
    <div class="login-form">
      <van-cell-group>
        <van-field
          v-model="sms"
          center
          clearable
          placeholder="手机号"
        >
          <template #button>
            <van-button size="small" type="primary">获取验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="value" placeholder="验证码" />
      </van-cell-group>
      <div class="login-btn">
        <van-button type="primary" size="large">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/images/logo.png'
export default {
  name: 'login',
  data () {
    return {
      logo,
      sms: '',
      value: ''
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /deep/.van-image{
    margin: 80px 0 40px;
  }
  .login-form{
    padding: 0 25px;
    .login-btn{
      padding-top: 70px;
    }
  }
}
</style>