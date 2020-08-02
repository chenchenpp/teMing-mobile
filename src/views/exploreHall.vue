<template>
  <div class="exploreHall-main">
    <tm-header></tm-header>
    <div class="content">
      <div class="area-explore-item" v-for="(item, index) in exploreHallList" :key="index">
        <img class="explore-banner" :src="item.imageUrl" alt="">
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
      exploreHallList: [{
        imgSrc: 'hall1.jpg',
        title: '上海 · 旗舰展厅',
        dress: '上海市徐汇区宜山路439号七建大厦1楼',
        phone: '(021)51505231'
      },{
        imgSrc: 'hall2.jpg',
        title: '宁波 · 展厅',
        dress: '上海市徐汇区宜山路439号七建大厦1楼 ',
        phone: '(021)51505231'
      }]
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
        console.log(res)
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
  .explore-banner{
    width: 100%
  }
  .title{
    margin-top: 20px;
    font-size: 17px;
    font-weight: bold;
    color: #333333
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

