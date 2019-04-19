<template>
    <div>
        <h1>我是详情页</h1>
        <ul>
            <li>影片ID：{{ filmInfo.id }}</li>
            <li>影片名字：{{ filmInfo.name }}</li>
            <li>影片评分：{{ filmInfo.grade }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      filmInfo: {} // 影片详情
    }
  },

  methods: {
    getDetailData () {
      axios.get('/json/detail.json').then(res => {
        var data = res.data
        var temp = data.find(item => {
          // this.$router.params.id 这是拿到 路由配置的 动态参数 地址栏上的 id 是一个字符串
          return item.id === parseInt(this.$route.params.id)
        })
        this.filmInfo = temp
      })
    }
  },

  watch: {
    '$route' () {
      console.log('路由组件发生变化了')
      this.getDetailData()
    }
  },

  created () {
    this.getDetailData()
  },
  beforeRouteEnter (to, from, next) {
    console.log('当要进入到详情页的时候触发')
    next()
  },

  beforeRouteUpdate (to, from, next) {
    console.log('当我们的组件被复用的时候触发')
    next()
  },

  beforeRouteLeave (to, from, next) {
    console.log('当我们这个组件离开的时候触发')
    next()
  }
}
</script>
