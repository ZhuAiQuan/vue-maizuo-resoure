<template>
  <div class="cinemas">
    <van-nav-bar title="影院">
      <template #right>
        <van-icon name="search" size="18" @click="$router.push('/search')" /> 
      </template>
      <template #left>
        <span @click="$router.push('/local')">{{ $store.state.film.city.name }}<van-icon name="arrow-down" /></span> 
      </template>
    </van-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item :title="search.cityId.name" ref="cityTag">
        <van-tag round :type="allType" class="custom-tag" @click="close">全部</van-tag>
        <van-tag round :type="item.type" v-for="(item, i) in query" :key="i" @click="closeTag(item)" class="custom-tag">{{ item.name }}</van-tag>
      </van-dropdown-item>
      <van-dropdown-item v-model="search.app" :options="search.applist" @change="getData" />
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
        cityId: {
          name: '全部',
          districtId: 0
        },
        app: 1,
        last: 0,
        applist: [
          { text: 'APP订票', value: 1 },
          { text: '前台兑换', value: 2 }
        ],
        lastTime: [
          { text: '最近去过', value: 0 },
          { text: '离我最近', value: 1 }
        ]
      },
      cinemas: [],
      query: [],
      tempQuery: [],
      allType: 'primary'
    }
  },
  methods: {
    getData () {
      getWays(this.$store.state.film.city.cityId, this.search.app).then(res => {
        if (res.status === 200) {
          this.cinemas = res.data.data.cinemas
          // 获取地区并去重
          let query = res.data.data.cinemas.map(item => item.district)
          this.query = this.checkArr(query)
          this.query.map(item => item.type = 'default')
          this.tempQuery = this.cinemas
          // 计算是否有筛选
          if (this.search.cityId.districtId) {
            const i = this.search.cityId.districtId
            this.cinemas = this.cinemas.filter(item => item.districtId === i)
          }
        } else {
          this.cinemas = []
          this.tempQuery = []
          this.query = []
        }
      })
    },
    toDetail (item) {
      this.$store.commit('GetCinemas', item)
      this.$router.push('/detail')
    },
    checkArr (arr) {
      for(let i = 0; i<arr.length; i++) {
        for(let j = i+1; j<arr.length; j++) {
          if (arr[i].districtId === arr[j].districtId) {
            arr.splice(j, 1);
            j--
          }
        }
      }
      return arr
    },
    closeTag (item) {
      this.search.cityId = item
      this.allType = 'default'
      this.query.map((v, i) => {
        v.type = 'default'
        if (v.districtId === item.districtId) {
          this.$set(v, 'type', 'primary')
        }
      })

      setTimeout(() => {
        this.cinemas = this.tempQuery
        this.cinemas = this.cinemas.filter(v => v.districtId === item.districtId)
        this.$refs.cityTag.toggle()
        console.log(this.cinemas)
      }, 200);
    },
    close () {
      this.search.cityId = {
        name: '全部',
        districtId: 0
      }
      this.allType = 'primary'
      this.query.map(item => item.type = 'default')
      setTimeout(() => {
        this.$refs.cityTag.toggle()
        this.cinemas = this.tempQuery
      }, 200);
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
.custom-tag{
  margin: 3px 15px;
  padding: 2px 10px;
}
</style>
