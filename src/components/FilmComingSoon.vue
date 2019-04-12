<template>
    <section id="main">
        <ul class="list">
            <li>
                <section class="playing">
                    <section class="p_left">
                        <a href="#">
                            <!-- <img src="../images/small1.jpg" /> -->
                        </a>
                    </section>
                    <section class="p_center">
                        <div class="film-name info">
                            <span class="name">波西米亚狂想曲</span>
                            <span class="item">2D</span>
                        </div>
                        <div class="film-grade info">
                            <span class="label">观众评分 </span>
                            <span class="grade">8.6</span>
                        </div>
                        <div class="file-actor info">
                            <span class="label">主演：布莱恩·辛格  约瑟夫·梅泽罗 拉米·马雷克 本·哈迪</span>
                        </div>
                        <div class="film-detail info">
                            <span class="label">英国  美国 | 135分钟</span>
                        </div>

                    </section>
                    <section class="p_right">
                        <div class="film-buy info">预购</div>
                    </section>
                </section>
            </li>
        </ul>
    </section>
</template>

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
</style>
