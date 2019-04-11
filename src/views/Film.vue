<template>
    <div>
        <Banner :banners="bannerList"></Banner>
    </div>
</template>

<script>
import Banner from '../components/Banner'
import axios from 'axios'
export default {
  data () {
    return {
      // 定义一个数据 将请求的数据保存在这个里面
      bannerList: []
    }
  },
  components: {
    Banner
  },
  // 每一个接口都需要传自定义的请求头
  methods: {
    /**
     * 请求轮播图的数据
     */
    getBannerList () {
      axios.get('https://m.maizuo.com/gateway?type=2&cityId=440300&k=3134197', {
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"1.0.0","e":"15544840671756641624924"}',
          'X-Host': 'mall.cfg.common-banner'
        }
      }).then(res => {
        // console.log(res.data.data)
        let data = res.data
        if (data.status === 0) {
          this.bannerList = data.data
        } else {
          alert('请求失败')
        }
      })
    }
  },
  created () {
    this.getBannerList()
  }
}
</script>
