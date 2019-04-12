<template>
  <div id="app">
    <router-view></router-view>
    <FooterBar :tabs="tabs"></FooterBar>
  </div>
</template>

<script>
import FooterBar from './components/FooterBar.vue'
export default {
  name: 'app',
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
  }
}
</script>

<style>
@import './styles/reset.css';
</style>
