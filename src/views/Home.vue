<template>
  <div class="home-main">
    <tm-header></tm-header>
    <div class="home-content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="el in carousolList" class="swiper-slide" :key="el.imgsrc">
            <img :src="require(`@/assets/images/home/${el.imgsrc}`)" alt />
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
import { getUserComTravelersByUserId } from '@/util/request/api.js';
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
    console.log(Swiper)
    this.$nextTick(() => {
      this.initSwiper();
    })

  },
  methods: {
    initSwiper() {
      let homeSwiper = new Swiper(".swiper-container", {
        autoplay: 3000,
        loop: true,
        speed: 1000, // 切换速度，slider自动滑动开始到结束的时间单位ms，也是触摸滑动时释放至贴合的时间。
        // effect: "fade",
        pagination : '.swiper-pagination'
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
  z-index: 1;
}
.home-content{
  position: absolute;
  top: 60px;
  bottom: 104px;
  left: 0;
  right: 0;
  z-index: 1;
  overflow-y: auto;
  .swiper-container{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover
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
</style>
