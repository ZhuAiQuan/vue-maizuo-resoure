<template>
  <div v-html="content" class="content">
  </div>
</template>

<script>
import { getInfo } from '../../api/request.js'
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getList () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      getInfo().then(res => {
        if (res.status === 200) {
          this.content = res.data.data.data.content
          this.$toast.clear()
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.content>p{
  margin: 0 !important
}
</style>
