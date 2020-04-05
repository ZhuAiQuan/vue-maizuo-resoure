<template>
  <div class="movies-content">
    <van-button class="custom-btn" plain hairline round type="default" size="small" @click="$router.push('/local')">{{ $store.state.film.city.name || '定位' }}</van-button>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, i) in bannerList" :key="`${_uid}-${i}`">
        <van-swipe-item>
          <van-image
            :attr="item.name"
            :src="item.imgUrl"
          />
        </van-swipe-item>
      </van-swipe-item>
    </van-swipe>
    <div class="nav-list">
      <van-tabs @click="getList">
        <van-tab :title="item.name" :name="item.type" v-for="(item, i) in film.list" :key="i"></van-tab>
      </van-tabs>
    </div>
    <div class="show-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="-无更多电影-"
        @load="getList"
      >
      <play-list :films="films" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { getBanner, PlayList } from '../../api/request.js'
import playList from './list/playList.vue'
export default {
  name: 'movies',
  data () {
    return {
      bannerList: [],
      loading: false,
      finished: true,
      active: 1,
      films: [],
      film: {
        list: [
          {
            name: '正在热映',
            type: 1
          },
          {
            name: '即将上映',
            type: 2
          }
        ]
      }
    }
  },
  mounted () {
    this.getBannerData()
    this.getList()
  },
  methods: {
    getBannerData () {
      getBanner(this.$store.state.film.city.cityId).then(res => {
        if (res.status === 200) {
          this.bannerList = res.data.data
        } else {
          this.bannerList = []
        }
      })
    },
    getList (name = 1) {
      PlayList({ type: name, cityId: this.$store.state.film.city.cityId }).then(res => {
        if (res.status === 200) {
          this.films = res.data.data.films
        } else {
          this.films = []
        }
      })
    }
  },
  components: {
    playList
  }
}
</script>

<style lang="less" scoped>
.movies-content{
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  .nav-list{
    min-height: 2rem;
    position: relative;
    top: -.21rem;
  }
  .show-list{
    min-height: 1rem;
    position: relative;
    top: -1.2rem;
  }
  /deep/.custom-btn{
    position: absolute;
    z-index: 9;
    left: 5px;
    top: 8px;
    opacity: .7;
  }
}
</style>
