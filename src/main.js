import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import { get, post } from './util/request/http';
import './components/global';
import 'amfe-flexible';
import "swiper/dist/css/swiper.css";
require('./assets/sass/reset.scss');
require('@/assets/font/zhanghaishan/zhanghaishan.css');
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
