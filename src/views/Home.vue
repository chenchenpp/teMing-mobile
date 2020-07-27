<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#iconFoot_massage"></use>
    </svg>
    <ul>
      <li class="shouye">首页</li>
      <li>关于</li>
    </ul>
  </div>
</template>

<script>
import { getUserComTravelersByUserId } from '@/util/request/api.js';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  methods: {
    goAbout() {
      this.$router.push({ path: '/about' });
    },
    clickHttp() {
      this.$get(getUserComTravelersByUserId, {
        page: 1,
        rows: 10
      }).then((res) => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home{
  font-size: 20px;
  .shouye{
    background: $color-theme
  }
}
</style>
