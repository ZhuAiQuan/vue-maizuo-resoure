<template>
  <div class="content">
    <van-nav-bar
      title="当前城市"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-search v-model="keyword" placeholder="请输入搜索关键词" />
    <div class="dialog">
      <span class="hot-title">GPS定位你所在的城市</span>
      <div class="hot-title location-btn">
        <van-tag size="large">定位</van-tag>
      </div>
      <span class="hot-title">热门城市</span>
      <div class="hot-city">
        <van-tag size="large" v-for="item in hotCity" :key="item.cityId" @click="chooseCity(item)">{{ item.name }}</van-tag>
      </div>
    </div>
    <van-index-bar class="indexBar" :sticky="false" highlight-color="#AE853A">
      <van-index-anchor v-for="(item,index) in cityDts" :key="index" :index="item.initial">
        <div class="city-index">
          <span class="indexWord">{{item.initial}}</span>
        </div>
        <van-cell
          @click="chooseCity(citem)"
          v-for="(citem,cindex) in item.list"
          :key="cindex"
          :title="citem.name"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { getMaps } from '../../api/request.js'
import Vue from 'vue';
import { IndexBar, IndexAnchor } from 'vant';
Vue.use(IndexBar);
Vue.use(IndexAnchor);
export default {
  data () {
    return {
      cityDts: [],
      hotCity: [],
      keyword: ''
    }
  },
  methods: {
    chooseCity (item) {
      this.$store.commit('GetCity', item)
      this.$router.go(-1)
    },
    resetData (data) {
      let list = [
        {
          initial: 'A',
          list: []
        },
        {
          initial: 'B',
          list: []
        },
        {
          initial: 'C',
          list: []
        },
        {
          initial: 'D',
          list: []
        },{
          initial: 'E',
          list: []
        },
        {
          initial: 'F',
          list: []
        },
        {
          initial: 'G',
          list: []
        },
        {
          initial: 'H',
          list: []
        },
        {
          initial: 'I',
          list: []
        },
        {
          initial: 'J',
          list: []
        },
        {
          initial: 'K',
          list: []
        },
        {
          initial: 'L',
          list: []
        },
        {
          initial: 'M',
          list: []
        },
        {
          initial: 'N',
          list: []
        },
        {
          initial: 'O',
          list: []
        },
        {
          initial: 'P',
          list: []
        },
        {
          initial: 'Q',
          list: []
        },
        {
          initial: 'R',
          list: []
        },
        {
          initial: 'S',
          list: []
        },
        {
          initial: 'T',
          list: []
        },
        {
          initial: 'U',
          list: []
        },
        {
          initial: 'V',
          list: []
        },
        {
          initial: 'W',
          list: []
        },
        {
          initial: 'X',
          list: []
        },
        {
          initial: 'Y',
          list: []
        },
        {
          initial: 'Z',
          list: []
        }
      ]
      list.map(item => {
        data.map(c => {
          if (item.initial === c.pinyin[0].toLocaleUpperCase()) {
            item.list.push(c)
          }
        })
      })
      this.cityDts = list
    },
    getData () {
      getMaps(this.$store.state.film.city.cityId).then(res => {
        if (res.status === 200) {
          this.resetData(res.data.data.cities)
          this.hotCity = res.data.data.cities.filter(item => item.isHot)
        } else {
          this.hotCity = []
          this.cityDts = []
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
/deep/.van-index-anchor{
  text-align: left;
  position: relative;
  .city-index{
    position: absolute;
    left: 0px;
    width: 100%;
    z-index: 9;
    top: -35px;
    padding-left: 20px;
    background: rgb(244, 244, 244);
  }
  /deep/.van-cell:nth-child(2) {
    margin-top: 35px;
  }
}
.content{
  overflow: hidden;
  .dialog{
    .hot-city{
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      padding-top: 15px;
      /deep/.van-tag--large{
        margin: 0 15px;
        padding: 2px 30px;
        margin-bottom: 15px;
        background: #f4f4f4;
        color: #333;
      }
    }
    .hot-title{
      font-size: 13px;
      color: #797d82;
      margin-bottom: 10px;
      text-align: left;
      display: block;
      margin-left: 15px;
      /deep/.van-tag--large{
        background: #f4f4f4;
        color: #333;
      }
    }
    .location-btn{
      background: #fff;
      margin: 0;
      padding: 10px 0 10px 15px;
    }
  }
}
</style>