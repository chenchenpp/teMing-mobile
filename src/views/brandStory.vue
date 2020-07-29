<template>
  <div class="brandStory-main">
    <tm-header></tm-header>
    <div class="content">
      <div class="top-video">
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
        <h2 class="title">特铭 · 产品特色</h2>
        <p class="des">每一个细节都达到美感和品质的高度统一</p>
        <img class="cha-banner" :src="require('@/assets/images/brandStory/forth-content-img1.png')" alt="">
        <ul class="point-items">
          <li v-for="(item, index) in pointsList" :key="index">
            <h2 class="name">{{item.title}}</h2>
            <p class="subtitle">{{item.des}}</p>
          </li>
        </ul>
      </div>
      <div class="customized">
        <h2 class="title">深度定制 · 五心服务</h2>
        <p class="des">提供贯穿客户从始至终的深度维护</p>
        <ul class="items">
          <li v-for="(item, index) in customizedList" :key="index">
            <div class="banner-box">
              <img :src="require(`@/assets/images/brandStory/${item.imgSrc}`)" alt="">
              <span class="title">{{item.title}}</span>
            </div>
            <p class="des">{{item.des}}</p>
          </li>
        </ul>
      </div>
    </div>
    <tm-footer></tm-footer>
  </div>
</template>
<script>
export default {
  data(){
    return {
      playerOptions: {
        height: "450px",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
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
      pointsList: [{
        title: '深度定制',
        des: '每一款特铭家居都是独一无二，量身定制的'
      },{
        title: '工匠精神',
        des: '大到门板，小到门条，每一块板材，都会经过专业师傅们细心的手工打磨'
      },{
        title: '精益求精',
        des: '能与使用者达到默契配合的产品，才是一款好产品'
      },{
        title: '创意设计',
        des: '时尚经典的设计、对细节的执着与无懈可击的质量是特铭一直的追求和坚持'
      },{
        title: '安心放心',
        des: '全部信息数据都会被永久存档保留，并且每位用户都享受特铭终身服务'
      }],
      customizedList: [{
        imgSrc: 'forth-content-img1.png',
        title: '贴心 · 家居设计服务',
        des: '根据客户房屋结构、装修风格、个人偏好等，提供深度的家居设计服务'
      },{
        imgSrc: 'forth-content-img1.png',
        title: '匠心 · 柔性生产服务',
        des: '根据定制方案和客户个性化特殊需求，一对一定制生产高端/高品质/高弹性的家具产品'
      },{
        imgSrc: 'forth-content-img1.png',
        title: '舒心 · 代购齐套服务',
        des: '提供非柜体家居产品的建议，找样和代购服务。'
      },{
        imgSrc: 'forth-content-img1.png',
        title: '放心 · 完美交付服务',
        des: '根据定制设计，保证交付过程和结果的零瑕疵。'
      },{
        imgSrc: 'forth-content-img1.png',
        title: '省心 · 定期保养服务',
        des: '不仅仅提供专业的家具保养建议，还对柜体产品提供一年一次的上门保养服务'
      }]
    }
  },
  methods:{
    onPlayerPlay(e) {
      this.$refs.videoPlayer.player.options_.muted = false;
    },
    playerReadied() {}
  }
}
</script>
<style lang="scss" scoped>
.brandStory-main{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
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
        width: 100%
      }
      .banner-box{
        position: relative;
        .title{
          width:50%;
          height:35px;
          display: inline-block;
          background: #ffffff;
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

