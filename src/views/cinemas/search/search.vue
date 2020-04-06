<template>
  <div class="cinemas-content">
    <form>
      <van-search
        v-model.trim="search"
        show-action
        clearable
        placeholder="输入影城名称"
        @search="onSearch"
        @cancel="$router.go(-1)"
        @input="filterData"
        @clear="resetData"
      />
    </form>
    <div v-if="!search" class="guess">
      <div class="title">离你最近</div>
      <ul class="cinemas-last">
        <li v-for="(item, i) in cinemas" :key="i" class="last-li" @click="toDetail(item)">
          <div class="text">{{ item.name }}</div>
        </li>
      </ul>
    </div>
    <div v-else>
      <van-cell v-for="(item, i) in all" :key="i" @click="toDetail(item)">
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
  </div>
</template>

<script>
import { getLast, getWays } from '../../../api/request.js'
export default {
  name: 'search',
  data () {
    return {
      search: '',
      cinemas: [],
      all: [],
      temp: []
    }
  },
  methods: {
    onSearch () {},
    getData () {
      getLast(this.$store.state.film.city.cityId).then(res => {
        if (res.status === 200) {
          this.cinemas = res.data.data.cinemas
        } else {
          this.cinemas = []
        }
      })
    },
    toDetail (item) {
      this.$store.commit('GetCinemas', item)
      this.$router.push('/detail')
    },
    allCinemas () {
      getWays(this.$store.state.film.city.cityId).then(res => {
        if (res.status === 200) {
          this.all = res.data.data.cinemas
          this.temp = this.all
        } else {
          this.all = []
          this.temp = []
        }
      })
    },
    filterData (val) {
      if (val === '') this.all = this.temp
      this.all = this.all.filter(item => item.name.indexOf(val) > -1)
    },
    resetData () {
      this.search = ''
      this.all = this.temp
    }
  },
  mounted () {
    this.getData();
    this.allCinemas()
  }
}
</script>

<style lang="less" scoped>
.cinemas-content{
  background: #fff;
  .guess{
    text-align: left;
    padding: 0 15px 8px 0;
    margin-left: 15px;
    position: relative;
    .title{
      font-size: 13px;
      line-height: 13px;
      color: #bdc0c5;
      margin: 18px 0;
    }
    .cinemas-last{
      display: flex;
      flex-wrap: wrap;
      .last-li{
        text-align: center;
        padding-bottom: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        float: left;
        .text{
          height: 30px;
          background-color: hsla(0,0%,96%,.6);
          line-height: 14px;
          border-radius: 3px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          font-size: 13px;
          padding: 8px 12px;
        }
      }
    }
  }
  /deep/.van-cell{
    text-align: left;
  }
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