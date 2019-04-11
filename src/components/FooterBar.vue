<template>
    <footer id="footer">
        <li v-for="(tab,index) in tabs"
            :key="index"
        >
            <router-link :to="tab.href" active-class="active">
                <!-- <i class="iconfont icon-dianying"></i> -->
                <i :class="['iconfont',tab.icon]"></i>
                {{ tab.name }}
            </router-link>
        </li>
        <!-- <a href="#">
            <i class="iconfont icon-yingyuana"></i>
            影院
        </a>
        <a href="#">
            <i class="iconfont icon-tehui"></i>
            特惠
        </a>
        <a href="about.html">
            <i class="iconfont icon-wode"></i>
            我的
        </a> -->
    </footer>
</template>

<script>
export default {
    props : {
        tabs : {
            type : Array
        }
    }
}
</script>

<style>
@import '../styles/iconfont.css';
#footer {
    height: 50px;
    box-sizing: border-box;
    border-top: #b2b2b2 1px solid;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#footer a {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.active{
    color: #ff5f16;
}
</style>

