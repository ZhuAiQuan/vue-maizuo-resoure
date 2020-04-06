<template>
  <ul class="footer">
    <li class="nav"
      v-for="(item, i) in nav"
      :key="`${_uid}-${i}`"
      @click="toPath(item.path)"
    >
      <van-icon :name="item.icon" size=".5rem" />
      <span class="text">{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'footBanner',
  data () {
    return {
      nav: [
        {
          icon: 'live',
          path: '/films',
          name: '电影'
        },
        {
          icon: 'photo',
          path: '/cinemas',
          name: '影院'
        },
        {
          icon: 'fire',
          path: '/info',
          name: '资讯'
        },
        {
          icon: 'manager',
          path: '/mine',
          name: '我的'
        }
      ],
      now: '/films'
    }
  },
  methods: {
    toPath (path) {
      // 不会重复跳相同的路由
      if (path === this.now) return
      this.$router.push(path)
    }
  },
  watch: {
    '$route' (to, from) {
      this.now = to.fullPath
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #ededed;
  box-sizing: border-box;
  .nav{
    width: 25%;
    text-align: center;
    cursor: pointer;
    position: relative;
    .text{
      font-size: .3rem;
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translate(-50%);
    }
    /deep/.van-icon{
      top: 0;
      margin-bottom: 20px;
    }
  }
}
</style>