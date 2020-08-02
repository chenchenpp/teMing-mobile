<template>
  <div class="home-main">
    <tm-header></tm-header>
    <div class="home-content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(el, index) in carousolList" class="swiper-slide" :key="index">
            <img :src="el.imageUrl" alt />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <tm-footer></tm-footer>
  </div>
</template>
<script>
import Swiper from "swiper";
import api from '@/util/request/api';
export default {
  name: 'home',
  data(){
    return {
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
      }]
    }
  },
  created(){
    this.init();
  },
  methods: {
    init() {
      this.$get(api.getPageHttp, {
        imageBelongPage: 15,
        en: 0
      }).then(res => {
        this.carousolList=res.arrList[0].imgArr
        // 初始化轮播图
        this.$nextTick(() => {
          this.initSwiper();
        });
      });
    },
    initSwiper() {
      let homeSwiper = new Swiper(".swiper-container", {
        autoplay: 3000,
        loop: true,
        speed: 1000, // 切换速度，slider自动滑动开始到结束的时间单位ms，也是触摸滑动时释放至贴合的时间。
        pagination : '.swiper-pagination',
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        lazyLoadingOnTransitionStart : true,
      });
    },
    // clickHttp() {
    //   this.$get(getUserComTravelersByUserId, {
    //     page: 1,
    //     rows: 10
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.home-main{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.home-content{
  width: 100%;
  margin-top: 60px;
  .swiper-container{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
    height: 100%;
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
}
.footer{
  margin-top: 20px;
}
</style>
