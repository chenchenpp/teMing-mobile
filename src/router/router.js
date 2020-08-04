import Vue from 'vue';
import Router from 'vue-router';
// 解决触发同一路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);
let routerList = [];
function importAll(routerArr) {
  routerArr.keys().forEach(item => {
    routerList.push(routerArr(item).default);
  });
};
importAll(require.context('.', true, /\.router\.js/));
export default new Router({
  mode: 'history',
  base: '/msite/',
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: 'home' */ '../views/Home.vue')
    },
    ...routerList
  ]
});
