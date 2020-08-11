<template>
  <div class="product-main">
    <tm-header></tm-header>
    <div class="container">
      <div class="head-banner">
        <div class="swiper-container header-swiper scroll-reveal">
          <div class="swiper-wrapper ">
            <div v-for="(el, index) in pageData.bannerCarouselList" class="swiper-slide" :class="{'swiper-no-swiping': pageData.bannerCarouselList.length==1}" :key="index">
              <img :src="el.imageUrl" alt />
            </div>
          </div>
        </div>
        <div class="P-title">
          <h1 class="scroll-reveal" >{{pageData[`pageTitle${language}`]}}</h1>
        </div>
      </div>
      <p class="P-des scroll-reveal" v-html="pageData[`pageTitleInfo${language}`]" data-scroll-reveal></p>
      <ul class="child-items">
        <li v-for="(item, index) in pageData.detailList" :key="index">
          <div class="h-banner scroll-reveal">
            <div class="swiper-container" :class="`child-swiper-container${index}`">
              <div class="swiper-wrapper">
                <div v-for="(imgData, imgDataIndex) in item.imgArr" class="swiper-slide" :key="imgDataIndex">
                  <div class="zoom" @click="nextImagesHandle(item, imgDataIndex)">
                    <img :src="imgData.imageUrl" alt="">
                  </div>
                </div>
              </div>
            </div>
            <i class="iconfont iconfangdajing magnifier" @click="checkImageHandle(item.imgArr, imgIndex)"></i>
          </div>
          <div class="v-banner scroll-reveal">
            <img :src="item.vImagArr.imageUrl" alt="">
            <i class="iconfont iconfangdajing magnifier" @click="checkImageHandle(item.vImagArr)"></i>
          </div>
          <p class="title scroll-reveal" data-scroll-reveal>{{item[`title${language}`]}}</p>
          <p class="info scroll-reveal"  v-html="item[`info${language}`]" data-scroll-reveal></p>
        </li>
      </ul>
    </div>
    <tm-footer></tm-footer>
  </div>
</template>
<script>
import Swiper from "swiper";
import ScrollReveal from 'scrollreveal'
import ScrollRevealCofig from '@/util/scrollReveal.config'
import api from '@/util/request/api';
export default {
  data(){
    return{
      scrollRevealDom: '.scroll-reveal',
      pageData: {
        pageTitle: "",
        pageTitleEnglish: '',
        pageTitleInfo: "",
        pageTitleInfoEnglish: "",
        detailList: [],
        bannerCarouselList: [],
        productSwiper: null
      }
    }
  },
  mounted(){
    this.init();
    this.$once('hook:beforeDestroy', ()=>{
      this.$EventBus.$off('showMenu');

    })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.init();
     window.scrollTo(0, 0)
    this.$EventBus.$emit('showMenu', false);
  },
  methods: {
    init() {
      const toast = this.$createToast({
        mask: true
      })
      toast.show()
      let allSeries = {
        'jiade':19,
        'molandi': 20,
        'miss': 21,
        'dikesen': 22,
        'bier': 23,
        'kelinte': 24,
        'botiqieli': 25,
        'mengdelian': 26
      };
      this.$get(api.getPageHttp, {
        imageBelongPage: allSeries[this.$route.params.type],
        en: 0
      }).then(res => {
        toast.hide()
        let { pageTitle, pageTitleEnglish, pageTitleInfo, pageTitleInfoEnglish } =res;
        Object.assign(this.pageData, { pageTitle, pageTitleEnglish, pageTitleInfo, pageTitleInfoEnglish });
        let arrList = [...res.arrList];
        // 头部轮播
        this.pageData.bannerCarouselList = arrList.shift().imgArr;
        // 主体部分
        this.pageData.detailList = arrList.splice(0, res.arrList.length - 1);
        this.pageData.detailList.forEach(item=>{
          item.vImagArr=item.imgArr.pop();
        })
        // 初始化轮播图
        this.$nextTick(() => {
          this.initSwiper();
          ScrollReveal().reveal(this.scrollRevealDom, ScrollRevealCofig);
          this.pageData.detailList.forEach((item, index)=>{
            this.$set(item,'swiperHandle',this.childSwiperhandle(index))
          })
        });
      });
    },
    nextImagesHandle(data, index){
      if(data.swiperHandle.activeIndex==index){
        return
      }
      data.swiperHandle.slideNext();
    },
    checkImageHandle(imgItem, imgIndex) {
      let imgArr;
      if(!Array.isArray(imgItem)){
        imgArr=[imgItem];
      }else{
        imgArr=[...imgItem]
      }
      imgArr=imgArr.map(data=>{
        return data.imageUrl
      })
      const params = {
        $props: {
          imgs: imgArr,
          initialIndex: imgIndex||0, // 响应式数据的key名
          loop: false
        },
        $events: {
          change: (i) => {
            // 必须更新 initialIndex
            this.initialIndex = i
          }
        }
      }
      this.$createImagePreview({ ...params }).show()
    },
    initSwiper() {
      if(this.productSwiper){
        this.productSwiper.init();
        return
      }
      this.productSwiper=new Swiper(".header-swiper", {
        autoplay: this.pageData.bannerCarouselList.length>1?3000:false,
        loop: this.pageData.bannerCarouselList.length>1?true:false,
        speed: 1000, // 切换速度，slider自动滑动开始到结束的时间单位ms，也是触摸滑动时释放至贴合的时间。
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        lazyLoadingOnTransitionStart : true,
        observer: true,
        observeParents:true,
        noSwiping: true,
      });
    },
    childSwiperhandle(index) {
      let className=".child-swiper-container"+index
      let childSwiper= new Swiper(className, {
        autoplayStopOnLast: true,
        followFinger: false,
        speed: 1000,

      });
      return childSwiper
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-reveal{
  visibility: hidden;
}
.product-main{
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // overflow-y: auto;
  .swiper-container{
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
      display: block
    }
  }
  .container{
    margin-top: 60px;
    width: 100%;
    box-sizing: border-box
  }
  .head-banner{
    margin: 0 20px;
    position: relative;
    overflow: hidden;
    .P-title{
      position: absolute;
      width: 180px;
      height: 50px;
      font-size:30px;
      // font-weight:bold;
      color:#333;
      background: linear-gradient(rgba($color: #ffffff, $alpha: .5),#ffffff, #ffffff);
      bottom: 0;
      left: 0;
      display: flex;
      align-items: flex-end;
      z-index: 100;
      justify-content: center

    }
  }

  .P-des{
    margin: 0 20px;
    margin-top: 26px;
    font-size:12px;
    // font-weight:bold;
    color: #676666;
    line-height:22px;
    text-align: left;
    padding-left: 23px;
  }
  .child-items{
    text-align: left;
    li{
      margin-top: 50px;
    }
    img{
      width: 100%;
      display: block
    }
    .h-banner, .v-banner{
      position: relative;
      .magnifier{
        position: absolute;
        bottom: 5px;
        width:29px;
        height:30px;
        background:rgba(42,40,42,1);
        opacity:0.5;
        color: #DDDDDD;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 100;
      }
    }
    .h-banner{
      // width: 100%;
      margin-left: 20px;
      // margin-right: 20px;
      .magnifier{
         right: 25px;
      }
      .zoom{
        position: absolute;
        height: 200px;
        box-sizing: border-box;
        width: 100%;
        padding-right: 20px;
        transform: scale(1);
        transform-origin: center;
        transition: transform 1s ease-out,top .9s linear,left 1s ease-out,transform-origin 0s 1.2s;
      }
      .swiper-slide{
        height: 200px;
      }
      .swiper-slide-prev{
        .zoom{
          // width: 60px;
          // height: 75px;
          // position: absolute;
          // left: -150px;
          // top: 16px;
          // z-index: 100;
          transform: scale(.3);
          transform-origin: left top;
          // transition-delay: 300ms;
        }
      }
      .swiper-slide-next{
        .zoom{
          // width: 60px;
          // height: 75px;

          left: -110px;
          top: 16px;
          z-index: 100;
          transform: scale(.3);
          transform-origin: left top;
          // transition-delay: 100ms;
        }
      }
      .swiper-slide-next+.swiper-slide{
        .zoom{
          // width: 60px;
          // height: 75px;

          left: -230px;
          top: 16px;
          z-index: 100;
          transform: scale(1);
          transform-origin: left top;
          // transition-delay: 100ms;
        }
      }
      .swiper-slide-active{
        .zoom{
          transform: scale(1);
          left: 0;
          top: 0;
          transform-origin: left top;
        }
        // transition: transform 2s ease
      }
    }
    .v-banner{
      margin: 0 20px;
      margin-top: 24px;
      box-sizing: border-box;
      .magnifier{
         right: 5px;
      }
    }
    .title{
      margin: 0 20px;
      font-size:19px;
      // font-weight:bold;
      color:#333;
      margin-top: 25px;
    }
    .info{
      margin: 0 20px;
      font-size:12px;
      color:#666666;
      line-height:18px;
      margin-top: 25px
    }
  }
}
</style>

