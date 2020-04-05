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
      getInfo().then(res => {
        if (res.status === 200) {
          console.log(res.data.data.data)
          this.content = res.data.data.data.content
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
