<template>
  <div id="app">
    <div class="home-loading" :class="{ 'home-loading-active': turnLoadingFlag }" v-if="isLoading">
      <img :src="require(`assets/images/${turnLoadingFlag? 'wLogo.png':'logo.png'}`)" alt class="logo" />
    </div>
    <template v-else>
      <router-view ></router-view>
    </template>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      isLoading: true,
      turnLoadingFlag: false
    }
  },
  created() {
    setTimeout(() => {
      this.turnLoadingFlag = true;
    }, 700);
    setTimeout(() => {
      this.isLoading = false;
    }, 2100);
  }
};
</script>
<style>
#app {
  font-family: 'zhanghaishan', "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; */
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.home-loading{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  height: 100vh;
  background-color: #2a282a;
  transition: background-color 0.7s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-loading-active {
  background-color: #ffffff;
}
</style>
