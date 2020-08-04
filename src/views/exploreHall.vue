<template>
  <div class="exploreHall-main">
    <tm-header></tm-header>
    <div class="content">
      <div class="area-explore-item" v-for="(item, index) in exploreHallList" :key="index">
        <div class="explore-box">
          <img class="explore-banner" :src="item.imageUrl" alt="">
          <a class="enter-explore" :href="item.linkUrl"></a>
        </div>
        <p class="title">{{item.imageDescTitle}}</p>
        <p class="dress" v-html="item.imageDescription"></p>
      </div>
    </div>
    <tm-footer class="footer"></tm-footer>
  </div>
</template>
<script>
import ScrollReveal from 'scrollreveal'
import ScrollRevealCofig from '@/util/scrollReveal.config'
import api from '@/util/request/api';
export default {
  data(){
    return {
      scrollRevealDom:".area-explore-item img,.area-explore-item .title,.area-explore-item .dress",
      exploreHallList: []
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      this.$get(api.getPageHttp, {
        imageBelongPage: 18,
        en: 0
      }).then(res => {
        this.exploreHallList=res.arrList[0].imgArr;
        // 初始化轮播图
        this.$nextTick(() => {
          ScrollReveal().reveal(this.scrollRevealDom, ScrollRevealCofig);
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.exploreHall-main{
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // overflow-y: auto;
  .content{
    margin-top: 60px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box
  }
  .area-explore-item:not(:first-child){
    margin-top: 40px
  }
  .explore-box{
    position: relative;
    img{
      display: block
    }
    .enter-explore{
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 80px;
      height: 22px;
      background: url('../assets/images/explorationHall/enterExplore.png') no-repeat center;
      background-size: 100%;
    }
  }
  .explore-banner{
    width: 100%
  }
  .title{
    margin-top: 20px;
    font-size: 17px;
    font-weight: bold;
    color: #333333;
    text-align: left
  }
  .dress{
    margin-top: 20px
  }
  .dress{
    font-size:12px;
    color:#666666;
    line-height:18px;
    text-align: left
  }
  .footer{
    margin-top: 20px
  }
}
</style>

