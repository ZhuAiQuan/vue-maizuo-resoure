<template>
  <div class="main-content">
    <router-view />
    <foot-banner />
  </div>
</template>

<script>
import footBanner from './footer/foot_banner.vue'
export default {
  name: 'app-main',
  data () {
    return {
      
    }
  },
  components: {
    footBanner
  },
  methods: {
    // checkLocation () {
    //   if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition(position => {
    //       console.log(position)
    //       do_something(position.coords.latitude, position.coords.longitude);
    //       // this.getPositon(position)
    //     });
    //   } else {}
    // },
    // getPositon (position) {
    //   console.log(position)
    // }
  },
  mounted () {
    // this.checkLocation()
  }
}
</script>

<style lang="less" scoped>
.main-content{
  margin-bottom: 60px
}
</style>