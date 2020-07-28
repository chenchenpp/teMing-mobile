export default {
  path: '/product/:type',
  name: 'product',
  component: () => import(/* webpackChunkName: 'product' */ '../views/product.vue')
};
