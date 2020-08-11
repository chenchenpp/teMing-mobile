import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import { get, post } from './util/request/http';
import './components/global';
import 'amfe-flexible';
import "swiper/dist/css/swiper.css";
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
require('./assets/sass/reset.scss');
require('@/assets/font/zhanghaishan.css');
Vue.use(VideoPlayer)
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$EventBus = new Vue();
Vue.config.productionTip = false;
// 全局混入语言包
sessionStorage.setItem('locale', 'CN')
Vue.mixin({
  data(){
    return {
      language: sessionStorage.getItem('locale')=='EN'?'English':''
    }
  },
  mounted(){
    this.$EventBus.$on('locale', (data)=>{
      this.language= data=='EN' ? 'English':'';
    });
  },
  beforeDestroy () {
    this.$EventBus.$off('locale')
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
