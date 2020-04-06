<template>
  <div class="play-list">
    <div class="films-content" v-for="(item, i) in films" :key="`${i}-${_uid}`" @click="toPath(item.filmId)">
      <div class="img-content">
        <van-image
          width="100%"
          height="100%"
          fit="contain"
          :src="item.poster"
        />
      </div>
      <div class="info-content">
        <div class="films-name">{{ item.name }} <van-tag>{{ item.item.name }}</van-tag></div>
        <div class="people" v-if="item.grade">观众评分  <span class="color">{{ item.grade }}</span></div>
        <div class="zy">
          主演:
          <span v-for="(item, index) in item.actors" :key="index">{{ item.name }} </span>
        </div>
        <div class="time">{{ item.nation }} | {{item.runtime}}分钟</div>
      </div>
      <div class="buy-btn">
        <van-button type="primary" size="mini">购票</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playList',
  data () {
    return {
      
    }
  },
  props: {
    films: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toPath(formId) {
      this.$router.push(`/filminfo/${formId}`)
    }
  }
}
</script>

<style lang="less" scoped>
.play-list{
  background: #ffffff;
  .films-content{
    display: flex;
    padding: 15px;
    .img-content{
      width: 2.2rem;
    }
    .info-content{
      width: calc(~"100% - 3.4rem");
      font-size: 14px;
      text-align: left;
      padding: 20px;
      color: #333;
      .films-name{
        font-weight: 600;
        font-size: 16px;
        color: #000;
        line-height: 16px;
      }
      .people{
        margin: 3px 0;
        .color{
          color: #ffb232;
        }
      }
      .zy{
        margin: 3px 0;
        overflow: hidden;
      }
    }
    .buy-btn{
      width: 1.2rem;
      display: flex;
      /deep/.van-button{
        margin: auto;
      }
    }
  }
}
</style>