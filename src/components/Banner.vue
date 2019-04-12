<template>
    <div class="swiper-container billboards">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
            v-for="(item,index) in banners"
            :key="index"
        >
          <img :src="item.imgUrl" alt="">
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
</template>

<script>
// const Swiper = this.Swiper
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  // 对 banner 发送请求 定义的形参
  props: {
    banners: {
      type: Array
    }
  },
  data () {
    return {
      swiper: null
    }
  },
  // 设置 轮播图
  updated () {
    if (!this.swiper) {
      this.swiper = new Swiper('.swiper-container', {
        loop: true, // 是否循环播放
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  }
}
</script>

<style>
/*
    注意一个小点，如果你的组件 使用了第三方的插件，那么
    不能再这里使用 scoped 这个属性，因为 它会给 类加上一些奇怪的东西，比如 [data-v12255]，
    会出现一些样式无法修改的问题
*/
.swiper-container {
    width : 100%;
    height : 180px;
}
.swiper-container img {
    width : 100%;
}
</style>
