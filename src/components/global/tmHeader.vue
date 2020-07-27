<template>
  <div class="heander-main">
    <div class="header">
      <img :src="require('@/assets/images/wLogo.png')" alt="">
      <i class="iconfont iconego-menu" @click="openMenuHandle"></i>
    </div>
    <div class="menu-content">
      <cube-scroll
        ref="scroll"
        :data="menuList"
        direction="horizontal"
        class="horizontal-scroll-list-wrap">
        <ul class="menu-items">
          <li v-for="(item, index) in menuList" :key="index">
            <div class="father-name">{{item.name}}</div>
            <ul class="child-items">
              <li v-for="(data, childIndex) in item.childrenList" :key="childIndex">
                {{data.name}}
              </li>
            </ul>
          </li>
        </ul>
      </cube-scroll>

      <div class="turn-trans">
        <span class="china">CN</span>
        <span class="english">EN</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'tm-header',
  data(){
    return {
      menuList: [{
        name: '首页',
        path: 'home'
      },{
        name: '产品中心',
        childrenList: [{
          name: '贾德系列',
          path: 'jiade'
        },{
          name: '莫兰迪系列',
          path: 'molandi'
        }]
      },{
        name: '品牌故事',
        path: '',
        childrenList: [{
          name: '产品特色',
          path: ''
        },{
          name: '五心服务',
          path: ''
        }]
      },{
        name: '特铭展厅',
        path: '',
        childrenList: [{
          name:'上海展厅',
          paht: ''
        }]
      },{
        name: '加入我们',
        path: '',
        childrenList: [{
          name: '企业入驻',
          path: ''
        }]
      }]
    }
  },
  methods: {
    openMenuHandle(){
      console.log('打开菜单')
    }
  }
};
</script>
<style scoped lang="scss">
.heander-main{
  position: fixed;
  width: 100%;
  min-height: 60px;
  z-index: 1000;
  background: #ffffff;
}
.header{
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  img{
    height: 30px;
  }
}
.menu-content{

  .menu-items{
    // width: 100%;
    display: flex;
    li{
      width: 140px;
      font-size: 14px;
      display: inline-block
    }
  }
}

</style>
