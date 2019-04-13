<template>
    <div id="home">
        <!--
            电影 影院 特惠 个人中心的渲染
         -->
        <router-view></router-view>

        <FooterBar :tabs="tabs"></FooterBar>
    </div>
</template>

<script>
import FooterBar from '../components/FooterBar.vue'
export default {
  data () {
    return {
      tabs: [
        { name: '电影', href: '/films', icon: 'icon-dianying' },
        { name: '影院', href: '/cinemas', icon: 'icon-yingyuana' },
        { name: '特惠', href: '/sales', icon: 'icon-tehui' },
        { name: '我的', href: '/center', icon: 'icon-wode' }
      ]
    }
  },
  components: {
    FooterBar
  },
  beforeDestroy() {
      console.log('=====home被销毁=====')
  },
  beforeCreate() {
      console.log('====home被重新创建了====')
  }
}
</script>
