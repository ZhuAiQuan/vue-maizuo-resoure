<template>
  <div class="detail">
    <van-nav-bar 
    left-arrow
    @click-left="$router.go(-1)">
    </van-nav-bar>
    <div class="head-title">{{ this.$store.state.film.cinamas.name }}</div>
    <div class="head-tag" @click="showNotice">
      <span v-for="(item, i) in cinemas.list.services" :key="i">{{ item.name }} </span>
      <van-icon name="arrow" />
    </div>
    <div class="address">
      <van-cell :title="cinemas.list.address" icon="location-o">
        <template #right-icon>
          <van-icon
            name="phone-o"
            style="line-height: inherit;"
          />
        </template>
      </van-cell>
    </div>
    <div class="film-bg">
      <div class="bg-blur" :style="{ 'background-image': bgImg }"></div>
      <div class="film-banner" v-for="(item, i) in hotList" :key="i">
        <van-image
          :src="item.poster"
          width="81.75px"
          height="100%"
        />
      </div>
    </div>
    <div class="film-info" @click="toPath">
      <div class="title">
        <div class="name"><span class="title">{{ hotList[0].name }}</span><span class="grade">{{ hotList[0].grade }}分</span></div>
        <div class="type">{{ hotList[0].category }} | {{ hotList[0].runtime }}分钟 | {{ hotList[0].director }}</div>
      </div>
      <div class="icon">
        <van-icon name="arrow" size="16px" />
      </div>
    </div>

    <van-popup
      v-model="show"
      position="top"
      closeable
      close-icon-position="top-left"
      :style="{ height: '35%' }"
    >
      <div class="head-title set-top">{{ this.$store.state.film.cinamas.name }}</div>
      <p class="show-title" v-for="(item, i) in cinemas.list.services" :key="i">
        <span class="title">{{ item.name }}</span>
        <span class="desc">{{ item.description }}</span>
      </p>
    </van-popup>
  </div>
</template>

<script>
import { getCinemasInfo, getCinemasHot } from '../../../api/request.js'
export default {
  name: 'cinemasDatails',
  data () {
    return {
      cinemas: {
        notice: [],
        list: {}
      },
      show: false,
      bgImg: 'url(https://static.maizuo.com/pc/v5/usr/movie/edb950316ac6aca7a9a71309b56bfb7f.jpg)',
      hotList: []
    }
  },
  mounted () {
    this.getCinemas()
  },
  methods: {
    getCinemas () {
      getCinemasInfo({
        cinemasId: this.$store.state.film.cinamas.cinemaId,
        cityId: this.$store.state.film.city.cityId
      }).then(res => {
        if (res.status === 200) {
          this.cinemas.list = res.data.data.cinema
          this.getHot()
        } else {
          this.cinemas.list = []
        }
      })
    },
    showNotice () {
      this.show = true
    },
    getHot () {
      getCinemasHot({
        cinemaId: this.$store.state.film.cinamas.cinemaId,
        cityId: this.$store.state.film.city.cityId
      }).then(res => {
        if (res.status === 200) {
          this.hotList = res.data.data.films
          this.bgImg = `url(${res.data.data.films[0].poster})`
        }
      })
    },
    // 这里没做v-for循环拿到数据 后续补充 暂时就当作只有一个数据
    toPath () {
      this.$router.push(`/filminfo/${this.hotList[0].filmId}`)
    }
  }
}
</script>

<style lang="less" scoped>
.detail{
  background: #fff;
  .head-title{
    padding: 0 15px;
    font-size: 17px;
    color: #191a1b;
    height: 44px;
    line-height: 44px;
  }
  .head-tag{
    padding: 6px 0 15px;
    color: #ffb232;
    font-size: 14px;
    text-align: center;
  }
  .show-title{
    font-size: 12px;
    color: rgb(121, 125, 130);
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    .title{
      color: #ffb232;
      font-size: 10px;
      width: 70px;
    }
    .desc{
      text-align: left;
      width: calc(~"100% - 70px");
    }
  }
  .set-top{
    margin-top: 20px;
  }
  .address{
    /deep/.van-cell{
      text-align: left;
    }
  }
  .film-bg{
    padding: 15px 0;
    height: 160px;
    position: relative;
    .bg-blur{
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-filter: blur(30px)
    }
    .film-banner{
      height: 100%;
      /deep/.van-image{
        margin-right: 16px;
      }
    }
  }
  .film-info{
    padding: 15px 0;
    position: relative;
    .icon{
      position: absolute;
      right: 10px;
      top: 35%;
    }
    .title{
      .name{
        .title{
          color: #191a1b;
          font-size: 15px;
          padding-right: 5px;
        }
        .grade{
          color: #ffb232;
          font-size: 16px;
        }
      }
      .type{
        font-size: 13px;
        color: #797d82;
      }
    }
  }
}
</style>