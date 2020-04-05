<template>
  <div>
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
  }
}
</script>

<style lang="less" scoped>
  
</style>