<template>
  <div class="brandStory-main">
    <tm-header></tm-header>
    <div class="content">
      <div class="top-video scroll-reveal">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @ready="playerReadied"
        >></video-player>
      </div>
      <div class="characteristic">
        <h2 class="title scroll-reveal">{{pointsList[`title${language}`]}}</h2>
        <p class="des scroll-reveal">{{pointsList[`info${language}`]}}</p>
        <img class="cha-banner scroll-reveal" :src="pointsList.imgArr&&pointsList.imgArr[0].imageUrl" alt="">
        <ul class="point-items">
          <template v-for="(item, index) in pointsList.imgArr">
            <li v-if="index>0" :key="index">
              <h2 class="name scroll-reveal">{{item[`imageDescTitle${language}`]}}</h2>
              <p class="subtitle scroll-reveal">{{item[`imageDescription${language}`]}}</p>
            </li>
          </template>
        </ul>
      </div>
      <div class="customized">
        <h2 class="title scroll-reveal">{{customizedList[`title${language}`]}}</h2>
        <p class="des scroll-reveal">{{customizedList[`info${language}`]}}</p>
        <ul class="items">
          <li v-for="(item, index) in customizedList.imgArr" :key="index">
            <div class="banner-box">
              <img class="scroll-reveal" :src="item.imageUrl" alt="">
              <span class="title scroll-reveal">{{item[`imageDescTitle${language}`]}}</span>
            </div>
            <p class="des scroll-reveal">{{item[`imageDescription${language}`]}</p>
          </li>
        </ul>
      </div>
    </div>
    <tm-footer></tm-footer>
  </div>
</template>
<script>
import ScrollReveal from 'scrollreveal'
import ScrollRevealCofig from '@/util/scrollReveal.config'
import api from '@/util/request/api';
export default {
  data(){
    return {
      scrollRevealDom: '.scroll-reveal',
      playerOptions: {
        height: "450px",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        // aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "http://106.52.5.152/static_img/brandStory.mp4"
          }
        ]
      },
      pointsList: [],
      customizedList: []
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init() {
      this.$get(api.getPageHttp, {
        imageBelongPage: 17,
        en: 0
      }).then(res => {
        this.pointsList=res.arrList[0];
        this.customizedList=res.arrList[1];
        // 初始化轮播图
        this.$nextTick(() => {
          ScrollReveal().reveal(this.scrollRevealDom, ScrollRevealCofig);
        });
      });
    },
    onPlayerPlay(e) {
      this.$refs.videoPlayer.player.options_.muted = false;
    },
    playerReadied() {}
  }
}
</script>
<style lang="scss" scoped>
.brandStory-main{
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // overflow-y: auto;
  .content{
    // position: absolute;
    // top: 60px;
    // left: 0;
    // right: 0;
    margin-top: 60px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box
  }
  .top-video{
    width: 100%;
    height: 450px;
  }
  .title{
    font-size:20px;
    font-weight:bold;
    color: #333333;
  }
  .des{
    font-size:12px;
    color:rgba(102,102,102,1);
    line-height:18px;
    margin-top: 9px;
  }
  .characteristic{
    margin-top: 29px;
    text-align: center;

    .cha-banner{
      width: 100%;
      margin-top: 30px
    }
    .point-items{
      margin-top: 20px;
      li{
        margin-bottom: 30px;
        text-align: left;
      }
      .name{
        font-size: 17px;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:19px;
      }
      .subtitle{
        font-size: 12px;
        color:rgba(102,102,102,1);
        line-height:18px;
        margin-top: 15px;
      }
    }
  }
  .customized{
    margin-top: 40px;
    .items{
      margin-top: 40px;
      img{
        width: 100%;
        display: block
      }
      .banner-box{
        position: relative;
        .title{
          width:50%;
          height:35px;
          display: inline-block;
          background: linear-gradient(rgba($color: #ffffff, $alpha: .5),#ffffff, #ffffff);
          line-height: 35px;
          text-align: center;
          font-size:17px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      .des{
        margin-left: 15px;
        font-size:12px;
        color:rgba(102,102,102,1);
        line-height:18px;
        text-align: left;
        margin-bottom: 30px
      }
    }
  }
}

</style>

