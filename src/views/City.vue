<template>
    <div class="city-list" id="city-list">
    <div class="lv-indexlist">
      <ul class="lv-indexlist__content" id="lv-indexlist__content">
        <div class="recommend-city">
          <div class="gprs-city">
            <div class="city-index-title">GPS定位你所在城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail city-item-detail-gprs">
                <div class="city-item-text">定位失败</div>
              </li>
            </ul>
          </div>
          <div class="hot-city">
            <div class="city-index-title">热门城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail"
                v-for="city in hotCitys"
                :key="city.cityId"
              >
                <div class="city-item-text">{{ city.name }}</div>
              </li>
              <!-- <li class="city-item-detail">
                <div class="city-item-text">天津</div>
              </li> -->
            </ul>
          </div>
        </div>
        <li class="lv-indexsection"
            v-for="item in myCitys"
            :key="item.py"
            :id="item.py"
        >
          <p class="lv-indexsection__index">{{ item.py }}</p>
          <ul>
            <li
                v-for="city in item.list"
                :key="city.cityId"
                
            >{{ city.name }}</li>
            <!-- <li>安阳</li>
            <li>安阳</li>
            <li>安阳</li> -->
          </ul>
        </li>
      </ul>
      <div class="lv-indexlist__nav">
        <ul>
          <li
            v-for="item in pys"
            :key="item"
            @click="fn(item)"
          >{{ item }}</li>
          <!-- <li>B</li>
          <li>C</li>
          <li>D</li>
          <li>E</li>
          <li>F</li>
          <li>G</li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    data() {
        return {
            citys: [], // 从后台接口中直接得到的数据
        }
    },
    /**
     * 对城市数据进行二次计算
     */
    computed: {
        myCitys() {
            var index = 0;
            var flag = {};
            var result = [];
            this.citys.forEach(item => {
                var py = item.pinyin.substr(0,1).toUpperCase()
                if (flag[py]) {
                    result[flag[py] - 1].list.push(item)
                } else {
                    var obj = {
                        py: py,
                        list: [ item ]
                    }
                    flag[py] = ++index
                    result.push(obj)
                }
            })
            result.sort((a,b) => {
                return a.py.charCodeAt() - b.py.charCodeAt()
            })
            return result
        },
        hotCitys() {
           return this.citys.filter(item => {
                return item.isHot
            })
        },
        pys() {
           return this.myCitys.map(item => {
                return item.py
            })
        }
    },
    
    methods: {
        /**
         * 获取城市列表数据
         */
        getCityList() {
            Axios.get('https://m.maizuo.com/gateway?k=8675184', {
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15544840671756641624924"}',
                    'X-Host': 'mall.film-ticket.city.list'
                }
            }).then(res => {
                let data = res.data;
                // console.log(data)
                if (data.status === 0) {
                    this.citys = data.data.cities;
                } else {
                    alert(data.msg)
                }
            })
        },
        /**
         * 点击跳转
         */
        fn(py) {
            // 1. 得到左侧相应的距离顶部的距离
            var el = document.getElementById(py)
            console.log(el.offsetTop)
            var box = document.getElementById('lv-indexlist__content')
            box.scrollTop = el.offsetTop
        }
    },
    created() {
        this.getCityList()
    }
}
</script>

<style lang="less">
@import '../styles/common/mixins.less';

.city-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 44px;
  position: fixed;

  .lv-indexlist {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    background: #fff;
    overflow: hidden;
    position: relative;
    &__content {
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
    &__nav {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 100%;

      li {
        height: 18px;
        font-size: 12px;
        color: #191a1b;
        padding: 0 6px;
      }
    }

    .lv-indexsection {
      &__index {
        background-color: #f4f4f4;
        color: #797d82;
        padding-left: 15px;
        height: 30px;
        line-height: 30px;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 15px;
        margin-bottom: -1px;
        li {
          .border-1-bottom;
          position: relative;
          width: 33.33%;
          height: 48px;
          line-height: 48px;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }

    .recommend-city {
      padding-left: 15px;
      padding-top: 15px;

      .city-index-title {
        font-size: 13px;
        color: #797d82;
        margin-bottom: 10px;
      }

      .city-index-detail {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .city-item-detail {
          width: 33.33%;
          text-align: center;
          padding-bottom: 15px;
          box-sizing: border-box;
          float: left;

          .city-item-text {
            height: 30px;
            line-height: 30px;
            background-color: #f4f4f4;
            border-radius: 3px;
            box-sizing: border-box;
            margin: 0 7.5px;
            font-size: 14px;
            color: #191a1b;
          }
        }
      }
    }
  }
}

</style>
