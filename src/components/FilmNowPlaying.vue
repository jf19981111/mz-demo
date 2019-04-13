<template>
    <section id="main">
        <ul class="list">
            <li
                v-for="film in filmList"
                :key="film.filmId"
            >
                <section class="playing">
                    <section class="p_left">
                        <router-link :to="{ name: 'detail', params: { id: film.filmId } }">
                            <img :src="film.poster" />
                        </router-link>
                    </section>
                    <section class="p_center">
                        <div class="film-name info">
                            <span class="name">{{ film.name }}</span>
                            <span class="item">{{ film.filmType.name }}</span>
                        </div>
                        <div class="film-grade info">
                            <span class="label">观众评分 </span>
                            <span class="grade">{{ film.grade }}</span>
                        </div>
                        <div class="file-actor info">
                            <span class="label">主演：{{ actorsFn(film.actors) }}</span>
                        </div>
                        <div class="film-detail info">
                            <span class="label">{{ film.nation }} | {{ film.runtime }}分钟</span>
                        </div>

                    </section>
                    <section class="p_right">
                        <div class="film-buy info">购票</div>
                    </section>
                </section>
            </li>
        </ul>
        <section class="load-more" @click="loadMore" v-if="pageNum < totalPage">加载更多...</section>
        <section class="load-more" v-else>已经见底了~~~</section>
    </section>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      filmList: [],
      pageNum: 1,
      pageSize: 15,
      total: 10 // 一共有多少条数据

    }
  },

  computed: {
    // 总的页数
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    getList () {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cityId: 440300,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          type: 1,
          k: 4870726
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"1.0.0","e":"15544840671756641624924"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        let data = res.data
        if (data.status === 0) {
          this.total = data.data.total
          // 对请求的数据进行追加
          // this.filmList = data.data.films
          this.filmList = this.filmList.concat(data.data.films)
        // this.filmList = this.filmList.push(...data.data.films)
        } else {
          alert(data.msg)
        }
        // console.log(data)
      })
    },
    /**
     * 加载更多 请求数据
     */
    loadMore () {
      this.pageNum++
      this.getList()
    },
    /**
     * 将主演的数组转换成主演的名字
     * @param {Array} actors 主演数组
     * 这里使用方法 而不用计算属性 是因为 我们需要传参
     */
    actorsFn (actors = []) {
      let temp = actors.map(item => {
        return item.name
      })
      //   console.log(temp)
      return temp.join('、')
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style>
#main {
    flex: 1;
    /* background: skyblue; */
    position: absolute;
    width: 100%;
    top: 222px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 46px;
}
#main ul {
    background: #fff;
    margin-left: 15px;
}
#main ul li {
    padding: 15px 15px 15px 0;
    height: 94px;
    position: relative;
}
#main ul li:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    color: #ededed;
    transform-origin: 0 100%;
    transform: scaleY(.5);
}
.playing {
    display: flex;
    justify-content: center;
}
/* 左边部分 */
.playing .p_left {
    width: 66px;
    height: 94px;
    background: rgb(249, 249, 249);
}
.playing .p_left a {
    display: block;
}
.playing .p_left img {
    width: 64px;
}
/* 中间部分 */
.p_center {
    width: calc(100% - 116px);
    padding: 0 0.1rem;
    box-sizing: border-box;
}
 .info {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
.p_center .film-name .name {
    color: #191a1b;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.p_center .film-name span {
    display: inline-block;
    vertical-align: middle;
}
.p_center .film-name .item {
    font-size: 12px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
}
.film-grade .label {
    font-size: 12px;
    margin-top: 4px;
    color: #797d82;
}
.film-grade .grade {
    color: #ffb232;
    font-size: 14px;
}
.p_right {
    width: 33.3%;
    height: 25px;
}
.film-buy {
    line-height: 25px;
    height: 24px;
    width: 50px;
    color: #ff5f16;
    font-size: 12px;
    text-align: center;
    border-radius: 2px;
    position: relative;
    margin-top: 19px;
}
.film-buy:after{
    content: " ";
    transform: scale(.5);
    position: absolute;
    border: 1px solid #ff5f16;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 4px;
}
.load-more {
    height: 36px;
    line-height: 36px;
    text-align: center;
}
</style>
