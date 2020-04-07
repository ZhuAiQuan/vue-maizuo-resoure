<template>
  <div class="film-content">
    <van-nav-bar
      :title="film.name"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-image
      :src="film.poster"
    />
    <div class="info">
      <div class="name">
        <span class="film-name">{{ film.name }} <van-tag>{{ film.filmType.name }}</van-tag> </span>
        <span class="film-pf" v-if="film.grade">{{ film.grade }}<span class="text">分</span></span>
      </div>
      <div class="type">{{ film.category }}</div>
      <div class="time">{{ film.time }}上映</div>
      <div class="film-type">{{ film.nation }} | {{ film.runtime }}分钟</div>
      <div class="detail">{{ film.synopsis }}</div>
    </div>
    <div class="actor-info">
      <div class="title">演职人员</div>
      <div class="pic">
        <div 
          v-for="(item, i) in film.actors"
          :key="i"
          class="people">
          <van-image
            width="85px"
            height="85px"
            :src="item.avatarAddress"
          />
          <span class="name">{{ item.name }}</span>
          <span class="role">{{ item.role }}</span>
        </div>
      </div>
    </div>
    <div class="film-photo">
      <div class="title">剧照<span class="all" v-if="film.photos && film.photos.length" @click="goPath">全部({{ film.photos.length }}) ></span></div>
      <ul class="content">
        <li class="photo" v-for="(item, i) in film.photos" :key="i" @click="seeMore(i)">
          <van-image
            :src="item"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { filmInfo } from '../../../api/request.js'
import Vue from 'vue'
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
export default {
  name: 'filmInfo',
  data () {
    return {
      film: {}
    }
  },
  mounted () {
    this.getInfo(this.$route.params.filmId)
  },
  methods: {
    getInfo (formId) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      filmInfo({ filmId: formId, cityId: this.$store.state.film.city.cityId }).then(res => {
        if (res.status === 200) {
          res.data.data.film.time = new Date(parseInt(res.data.data.film.premiereAt) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
          this.film = res.data.data.film
          this.$store.commit('GetPhotos', res.data.data.film.photos)
          this.$toast.clear()
        } else {
          this.film = {}
          this.$store.commit('GetPhotos', [])
          this.$toast.clear()
        }
      }).catch(() => {
        this.$toast.clear()
      })
    },
    seeMore (i) {
      ImagePreview({
        images: this.$store.state.film.photos,
        startPosition: i
      });
    },
    goPath() {
      this.$router.push('/seePhoto')
    }
  }
}
</script>

<style lang="less" scoped>
.info{
  padding: 12px 15px;
  color: rgb(121, 125, 130);
  background: #fff;
  .name{
    display: flex;
    position: relative;
    color: #000;
    .film-name{
      font-size: 18px;
      position: relative;
      /deep/.van-tag{
        position: absolute;
        top: 4px;
        right: -30px;
      }
    }
    .film-pf{
      color: #ffb232;
      font-size: 18px;
      position: absolute;
      right: 0;
      .text{
        font-size: 10px;
      }
    }
  }
  .type,.time,.film-type,.detail{
    margin-top: 4px;
    font-size: 13px;
    text-align: left;
  }
  .detail{
    margin-top: 12px;
    font-size: 12px;
  }
}
.film-content{
  background: rgb(244, 244, 244);
  .actor-info{
    margin-top: 10px;
    background: #fff;
    padding-bottom: 5px;
    .title{
      font-size: 16px;
      text-align: left;
      color: #000;
      padding: 15px;
    }
    .pic{
      display: flex;
      padding-left: 15px;
      overflow-x: auto;
      .people{
        margin-right: 10px;
        min-width: 85px;
        .name{
          font-size: 12px;
          display: block;
        }
        .role{
          font-size: 10px;
          display: block;
        }
      }
    }
  }
  .film-photo{
    margin-top: 10px;
    background: #fff;
    .title{
      font-size: 16px;
      text-align: left;
      color: #000;
      padding: 15px;
      position: relative;
      .all{
        font-size: 13px;
        color: #797d82;
        position: absolute;
        right: 15px;
        cursor: pointer;
      }
    }
    .content{
      margin-left: 15px;
      overflow-x: auto;
      display: flex;
      .photo{
        margin-right: 10px;
        margin-bottom: 15px;
        min-width: 150px;
        height: 100px;
        overflow: hidden;
        /deep/.van-image{
          top: -50%;
        }
      }
    }
  }
}
</style>