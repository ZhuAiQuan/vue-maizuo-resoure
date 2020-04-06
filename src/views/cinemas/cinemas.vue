<template>
  <div class="cinemas">
    <van-nav-bar title="影院">
      <template #right>
        <van-icon name="search" size="18" /> 
      </template>
      <template #left>
        <span @click="$router.push('/local')">{{ $store.state.film.city.name }}<van-icon name="arrow-down" /></span> 
      </template>
    </van-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item v-model="search.cityId" :options="search.city" />
      <van-dropdown-item v-model="search.app" :options="search.applist" />
      <van-dropdown-item v-model="search.last" :options="search.lastTime" />
    </van-dropdown-menu>
    <van-cell v-for="(item, i) in cinemas" :key="i" @click="toDetail(item)">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="cinemas-title">{{ item.name }}</span>
      </template>
      <template #default>
        <div class="cinemas-right">
          <div class="pri"><span class="fh">￥</span>{{ item.lowPrice/100 }}<span class="fh"> 起</span></div>
          <div class="location">距离未知</div>
        </div>
      </template>
      <template #label>
        <span class="custom-address">{{ item.address }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getWays } from '../../api/request.js'
export default {
  name: '',
  data () {
    return {
      search: {
        city: [
          { text: '全城', value: 0 }
        ],
        cityId: 0,
        app: 0,
        last: 0,
        applist: [
          { text: 'APP订票', value: 0 },
          { text: '前台兑换', value: 1 }
        ],
        lastTime: [
          { text: '最近去过', value: 0 },
          { text: '离我最近', value: 1 }
        ]
      },
      cinemas: []
    }
  },
  methods: {
    getData () {
      getWays(this.$store.state.film.city.cityId).then(res => {
        if (res.status === 200) {
          // console.log(res.data.data)
          this.cinemas = res.data.data.cinemas
        } else {
          this.cinemas = []
        }
      })
    },
    toDetail (item) {
      this.$store.commit('GetCinemas', item)
      this.$router.push('/detail')
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
/deep/.van-cell{
  text-align: left;
}
.cinemas{
  .cinemas-title{
    font-size: 14px;
    color: #191a1b;
  }
  .cinemas-address{
    font-size: 12px;
    color: #797d82;
    margin-top: 5px;
  }
  .cinemas-right{
    .pri{
      color: #ff5f16;
      font-size: 15px;
      .fh{
        font-size: 11px;
      }
    }
    .location{
      font-size: 11px;
      color: #797d82;
      margin-top: 5px;
    }
  }
}
</style>
