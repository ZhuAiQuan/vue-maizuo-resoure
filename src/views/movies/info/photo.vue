<template>
  <div>
    <van-nav-bar
      :title="`剧照（${$store.state.film.photos.length}）`"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="content">
      <div class="photo" v-for="(item, i) in this.$store.state.film.photos" :key="item" @click="seeMore(i)">
        <div class="photo-style">
          <van-image
            width="100%"
            height="100%"
            :src="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
export default {
  name: 'seePhoto',
  methods: {
    seeMore (i) {
      ImagePreview({
        images: this.$store.state.film.photos,
        startPosition: i
      });
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  display: flex;
  flex-wrap: wrap;
  .photo{
    width: 33%;
    height: 200px;
    overflow: hidden;
    .photo-style{
      margin-right: 1.5px;
      margin-bottom: 1.5px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>