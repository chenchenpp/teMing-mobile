<template>
  <div class="joinUs-main">
    <tm-header></tm-header>
    <div class="container">
      <div class="swiper-container scroll-reveal">
        <div class="swiper-wrapper">
          <div v-for="(el, index) in carousolList" class="swiper-slide" :class="{'swiper-no-swiping': carousolList.length==1}" :key="index">
            <img :src="el.imageUrl" alt />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" v-if="carousolList.length>1"></div>
      </div>
      <ul class="benefit-content">
        <li v-for="(item, index) in benefitList" :key="index">
          <p class="title scroll-reveal">{{item[`mainTitle${language}`] }}</p>
          <p class="des scroll-reveal">{{item[`subTitle${language}`]}}</p>
          <img class="scroll-reveal" :src="item.imageUrl" alt="">
          <p class="info scroll-reveal" v-html="item[`imageDescription${language}`]"></p>
        </li>
      </ul>
      <div class="special-point-content">
        <p class="title scroll-reveal">{{specialPointList[`title${language}`]}}</p>
        <p class="des scroll-reveal">{{specialPointList[`info${language}`]}}</p>
        <ul class="special-items">
          <li v-for="(item, index) in specialPointList.imgArr" :key="index">
            <img class="scroll-reveal" :src="item.imageUrl" alt="">
            <p class="info scroll-reveal" v-html="item[`imageDescription${language}`]"></p>
          </li>
        </ul>
      </div>
      <div class="fileProcessing scroll-reveal">
        <cube-button :outline="true" :inline="true">加盟文档 · 下载</cube-button>
        <cube-button :outline="true"  :inline="true">上传 · 加盟文档</cube-button>
      </div>
    </div>
    <tm-footer></tm-footer>
  </div>
</template>
<script>
import Swiper from "swiper";
import api from '@/util/request/api';
import ScrollReveal from 'scrollreveal'
import ScrollRevealCofig from '@/util/scrollReveal.config'
export default {
  data(){
    return {
      scrollRevealDom:".scroll-reveal",
      carousolList: [],
      benefitList: [],
      specialPointList: {}
    }
  },
  created(){
    this.init();
  },
  methods: {
    init() {
      this.$get(api.getPageHttp, {
        imageBelongPage: 16,
        en: 0
      }).then(res => {
        this.carousolList=res.arrList[0].imgArr;
        this.benefitList=res.arrList[1].imgArr;
        this.specialPointList=res.arrList[2];
        // 初始化轮播图
        this.$nextTick(() => {
          this.initSwiper();
          ScrollReveal().reveal(this.scrollRevealDom, ScrollRevealCofig);
        });
      });
    },
    initSwiper() {
      new Swiper(".swiper-container", {
        autoplay: this.carousolList.length>1?3000: false,
        loop: this.carousolList.length>1?true: false,
        speed: 1000, // 切换速度，slider自动滑动开始到结束的时间单位ms，也是触摸滑动时释放至贴合的时间。
        pagination : '.swiper-pagination',
        paginationHide:this.carousolList.length>1?true: false,
        noSwiping: true,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.joinUs-main{
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // overflow-y: auto;
  .container{
    margin-top: 60px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box
  }
  .swiper-container{
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
      display: block
    }
  }
  ::v-deep .swiper-pagination-bullet{
    width: 25px;
    height: 4px;
    background: #ffffff;
    opacity: 0.6;
    border-radius: unset
  }
  ::v-deep .swiper-pagination-bullet-active{
    opacity: 1;
  }
  .benefit-content{
    text-align: center;
    li{
      margin-top: 41px;
    }
    .title{
      font-size:19px;
      font-weight:bold;
      color:#333333
    }
    .des{
      font-size:12px;
      color:#666666;
      line-height:18px;
      margin-top: 10px
    }
    img{
      width: 100%;
      margin-top: 35px;
    }
    .info{
      margin-top: 20px;
      font-size:14px;
      color:#333333;
      line-height:20px;
      text-align: left
    }
  }
  .special-point-content{
    margin-top: 40px;
    .title{
      font-size:19px;
      font-weight:bold;
      color:rgba(51,51,51,1);
    }
    .des{
      font-size:12px;
      color:rgba(102,102,102,1);
      line-height:18px;
      margin-top: 10px;
    }
    .special-items{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 40px;
      li{
        width: 157px;
      }
      img{
        width: 100%;
      }
      .info{
        font-size:13px;
        color:rgba(51,51,51,1);
        line-height:19px;
        text-align: center;
        margin: 20px 0;
      }
    }
  }
  .fileProcessing{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .cube-btn{
      width: 157px;
      height: 32px;
      color:rgba(102,102,102,1);
      font-size: 13px;
    }
  }
}
</style>

