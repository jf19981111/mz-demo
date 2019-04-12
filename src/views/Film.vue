<template>
    <div>
        <Banner :banners="bannerList"></Banner>

        <section class="tabBar">
          <!--
            这里有一个小点 注册点击事件的时候切换 类样式 但同时也要改变 路由中 url 地址的改变
            所以不能是这样写 @click="curType = item.id"
            所以 应该写一个方法 将整个 item 传入进去
           -->
          <a
            v-for="item in filmTypes"
            :key="item.id"
            :class="{ active: curType === item.id }"
            @click="changeType(item)"
          >
            <span>{{ item.name }}</span>
          </a>
        </section>
        <div
          class="tab-ink-bar-wrapper"
          :style="tabInkBarStyle">
          <span class="tab-ink-bar" style="width: 56px;"></span>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import Banner from '../components/Banner'
import axios from 'axios'
export default {
  data () {
    return {
      // 定义一个数据 将请求的数据保存在这个里面
      bannerList: [],
      filmTypes: [
        { id: 'nowPlaying', name: '正在热映', href: '/films/nowPlaying' },
        { id: 'comingSoon', name: '即将上映', href: '/films/comingSoon' }
      ],
      curType: this.$route.path.substring(7) // 默认让他根据 url 地址来切换
    }
  },
  computed: {
    tabInkBarStyle () {
      let obj = {
        transform: 'translate3d(0%, 0px, 0px)',
        width: '50%'
      }
      if (this.curType === 'comingSoon') {
        obj.transform = 'translate3d(100%, 0px, 0px)'
      }
      return obj
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
    },
    /**
     * 设置影片类型选项的切换
     * @param {Object} item 当前需要切换的类型对象
     */
    changeType (item) {
      this.curType = item.id
      this.$router.push(item.href)
    }
  },
  created () {
    this.getBannerList()
  }
}
</script>

<style>
  .tabBar {
      position: relative;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #dedede;
      background: #fff;
  }
  .tabBar a {
      width: 50%;
      text-align: center;
      display: block;
      line-height: 40px;
  }
  .tabBar a span {
      display: inline-block;
      /* border-bottom: 1px solid tomato; */
  }
  .tab-ink-bar-wrapper {
    position: absolute;
    margin: auto;
    top: 220px;
    left: 0;
    transform: translateZ(0);
    transition: transform .2s cubic-bezier(.35,0,.25,1);
  }
  .tab-ink-bar {
    border-bottom: 2px solid #ff5f16;
    border-radius: 20px;
    display: block;
    margin: auto;
  }
  .active {
    color: #ff5f16;
  }
</style>
