<template>
  <div class="joinUs-main">
    <tm-header></tm-header>
    <div class="container">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(el, index) in carousolList" class="swiper-slide" :key="index">
            <img :src="el.imageUrl" alt />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <ul class="benefit-content">
        <li v-for="(item, index) in benefitList" :key="index">
          <p class="title">{{item.mainTitle}}</p>
          <p class="des">{{item.subTitle}}</p>
          <img :src="item.imageUrl" alt="">
          <p class="info" v-html="item.imageDescription"></p>
        </li>
      </ul>
      <div class="special-point-content">
        <p class="title">{{specialPointList.title}}</p>
        <p class="des">{{specialPointList.info}}</p>
        <ul class="special-items">
          <li v-for="(item, index) in specialPointList.imgArr" :key="index">
            <img :src="item.imageUrl" alt="">
            <p class="info" v-html="item.imageDescription"></p>
          </li>
        </ul>
      </div>
      <div class="fileProcessing">
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
      scrollRevealDom:".joinUs-main .container .title, .joinUs-main .container .des,.benefit-content img,.special-point-content img,.joinUs-main .container .info",
      carousolList: [{
        link:'',
        imgsrc: 'banner1.jpg'
      },{
        link:'',
        imgsrc: 'banner2.jpg'
      },{
        link:'',
        imgsrc: 'banner3.jpg'
      },{
        link:'',
        imgsrc: 'banner4.jpg'
      },{
        link:'',
        imgsrc: 'banner5.jpg'
      }],
      benefitList: [{
        title: '我们的优势',
        des: '雅居乐，万科，绿地，复兴等地产战略合作',
        imgsrc: 'img1.png',
        info: '雅居乐，万科，绿地，复兴等地产战略合作</br>超过100位设计总监级别的合作</br>高坪效，高利润</br>全品类产品支持，超过交货期'
      },{
        title: '加入特铭你可以得到什么',
        des: '全面的经营扶持政策；全维度营销引流和门店运营指导',
        imgsrc: 'img1.png',
        info: '全屋定制产品库</br>高定支持，自主研发个性化产品</br>全面的经营扶持政策</br>全维度营销引流和门店运营指导'
      }],
      specialPointList: {
        title: '开业扶持政策',
        des: '提供经销商年度返利；完善的零售运营培训和产品培训',
        pointsList: [{
          imgsrc: 'img1.png',
          mes: '丰富的全屋定制品牌</br>一个店做全屋'
        },{
          imgsrc: 'img1.png',
          mes: '协助经销商选址'
        },{
          imgsrc: 'img1.png',
          mes: '提供店面设计'
        },{
          imgsrc: 'img1.png',
          mes: '给与店面装修补贴'
        },{
          imgsrc: 'img1.png',
          mes: '协助经销商选品和样品设计'
        },{
          imgsrc: 'img1.png',
          mes: '开店支持和培训'
        },{
          imgsrc: 'img1.png',
          mes: '提供经销商年度返利'
        },{
          imgsrc: 'img1.png',
          mes: '完善的零售运营培训</br>和产品培训'
        }]
      }
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
      let homeSwiper = new Swiper(".swiper-container", {
        autoplay: 3000,
        loop: true,
        speed: 1000, // 切换速度，slider自动滑动开始到结束的时间单位ms，也是触摸滑动时释放至贴合的时间。
        pagination : '.swiper-pagination'
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

