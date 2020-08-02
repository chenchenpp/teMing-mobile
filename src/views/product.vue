<template>
  <div class="product-main">
    <tm-header></tm-header>
    <div class="container">
      <div class="head-banner">
        <div class="swiper-container header-swiper">
          <div class="swiper-wrapper ">
            <div v-for="(el, index) in pageData.bannerCarouselList" class="swiper-slide" :key="index">
              <img :src="el.imageUrl" alt />
            </div>
          </div>
        </div>
        <div class="P-title">
          <h1>{{pageData[`pageTitle${language}`]}}</h1>
        </div>
      </div>
      <p class="P-des" v-html="pageData[`pageTitleInfo${language}`]" data-scroll-reveal></p>
      <ul class="child-items">
        <li v-for="(item, index) in pageData.detailList" :key="index">
          <div class="h-banner">
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
          <div class="v-banner">
            <img :src="item.vImagArr.imageUrl" alt="">
            <i class="iconfont iconfangdajing magnifier" @click="checkImageHandle(item.vImagArr)"></i>
          </div>
          <p class="title" data-scroll-reveal>{{item[`title${language}`]}}</p>
          <p class="info" v-html="item[`info${language}`]" data-scroll-reveal></p>
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
      pageName:this.$route.params.type,
      scrollRevealDom: '.product-main .P-title h1, .P-des, .child-items .h-banner, .child-items .v-banner, .child-items .title, .child-items .info',
      jiadeData: {
        carousolList: ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner5.jpg'],
        titleCN: '贾德系列',
        titleEN: 'Judd series',
        desCN: '时尚高冷</br>灰白色的主调</br>主流系的配置<br>适合成熟稳重的成功人士 ',
        desEN: 'Fashionable high cold</br>grey and white tone </br> configuration of mainstream system</br>suitable for mature and stable successful people',
        childList: [{
          titleCN: '现代、科技、以人为本',
          titleEN: 'Modern, science and technology, people-oriented',
          mesCN: '以西班牙岩板作为主基调</br>打造冷艳大方、时尚高贵</br>电子升降餐桌及德国曙光阁部件的运用</br>使得产品既有轻奢靓丽的外衣</br>又有现代、科技',
          mesEN: 'Taking Spanish rock plate as the main keynote </br> to create elegant and elegant, fashionable and noble </br> the application of electronic lifting table and German dawn Pavilion components makes the products not only light and luxurious </br>but also modern and technological',
          imgList: [{
            imgSrc: ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner5.jpg'],
          },{
            imgSrc: 'child2.jpg',
          }]
        },{
          titleCN: '古典繁复与现代利落的融合',
          titleEN:'The fusion of classical complexity and modern neatness',
          mesCN: '在灯光的氛围下</br>演绎出的是大气且充满质感的轻奢主义</br>它就像冬天里的一张羊绒被</br>能让你得到最温暖的呵护</br>厚薄交错的板片结构</br>与大块面的肤感漆面单轨大移门</br>正是要把这种复杂与简约</br>结合得恰到好处',
          mesEN: 'In the light atmosphere </br> deduces the atmosphere and full of texture of light luxury doctrine </br> it is like a cashmere quilt in winter </br> it can let you get the most warm care </br> the thickness staggered plate structure </br> and the skin feeling paint monorail sliding door with large surface </br> is to combine this kind of complexity and simplicity properly',
          imgList: [{
            imgSrc: ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner5.jpg'],
          },{
            imgSrc: 'child2.jpg',
          }]
        },{
          titleCN: '全敞开的衣柜墙挂家族',
          titleEN: 'Fully open wardrobe wall hanging family',
          mesCN: '在炫酷的灯光烘托下</br>诠释出年轻人灵动跳跃的心</br>让你每天在衣柜空间的时光</br>都犹如在逛时尚的服装店</br>肤感质地的漆面工艺</br>在肌肤与之亲密接触时</br>感受到的将是流水般的丝滑',
          mesEN: 'In the light atmosphere </br> deduces the atmosphere and full of texture of light luxury doctrine </br> it is like a cashmere quilt in winter </br> it can let you get the most warm care </br> the thickness staggered plate structure </br> and the skin feeling paint monorail sliding door with large surface </br> is to combine this kind of complexity and simplicity properly',
          imgList: [{
            imgSrc: ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner5.jpg'],
          },{
            imgSrc: 'child2.jpg',
          }]
        }]
      },
      pageData: {
        pageTitle: "",
        pageTitleEnglish: '',
        pageTitleInfo: "",
        pageTitleInfoEnglish: "",
        detailList: [],
        bannerCarouselList: [],
      },
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
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
        console.log(res)
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
            //  item.swiper= this.childSwiperhandle(index);
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
      console.log(imgItem)
      let imgArr;
      if(!Array.isArray(imgItem)){
        imgArr=[imgItem];
      }else{
        imgArr=[...imgItem]
      }
      imgArr=imgArr.map(data=>{
        return data.imageUrl
      })
      console.log(imgArr)
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
      let homeSwiper = new Swiper(".header-swiper", {
        autoplay: 3000,
        loop: true,
        speed: 1000, // 切换速度，slider自动滑动开始到结束的时间单位ms，也是触摸滑动时释放至贴合的时间。
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        lazyLoadingOnTransitionStart : true,
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
      font-weight:bold;
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
    font-weight:bold;
    color: #676666;
    line-height:22px;
    text-align: left;
    padding-left: 23px;
  }
  .child-items{
    text-align: left;
    li{
      margin-top: 40px;
    }
    img{
      width: 100%;
    }
    .h-banner, .v-banner{
      position: relative;
      .magnifier{
        position: absolute;
        bottom: 0;
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
         right: 20px;
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
         right: 0px;
      }
    }
    .title{
      margin: 0 20px;
      font-size:19px;
      font-weight:bold;
      color:#333;
      margin-top: 39px;
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

