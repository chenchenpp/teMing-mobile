<template>
  <div class="header-main">
    <div class="header">
      <img :src="require('@/assets/images/wLogo.png')" alt="">
      <i class="iconfont" :class="[menuIcon]" @click="openMenuHandle"></i>
    </div>
    <div class="menu-content" :class="{'menu-active': isMenu}">
      <cube-scroll
        ref="scroll"
        :data="menuList"
        direction="horizontal"
        class="horizontal-scroll-list-wrap">
        <ul class="list-wrapper">
          <li v-for="(item, index) in menuList" :key="index" class="list-item">
            <div class="father-name" v-if="item.childrenList&&item.childrenList.length">{{item.name}}</div>
            <router-link class="father-name" v-else :to="`/${item.path}`">{{item.name}}</router-link>
            <ul class="child-items">
              <li v-for="(data, childIndex) in item.childrenList" :key="childIndex" @click="goRouter(item, data)">
                {{data.name}}
              </li>
            </ul>
          </li>
        </ul>
      </cube-scroll>
      <div class="turn-trans">
        <span class="china">CN</span> |
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
        path: 'product',
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
      }],
      isMenu: false,
    }
  },
  computed: {
    menuIcon(){
      return this.isMenu? 'iconfork':'iconego-menu'
    }
  },
  methods: {
    openMenuHandle(){
      console.log('打开菜单')
      this.isMenu=!this.isMenu;
    },
    goRouter(item, data){
      this.$router.push(`/${item.path}/${data.path}`)
    }
  }
};
</script>
<style scoped lang="scss">
.header-main{
  position: fixed;
  left: 0;
  right: 0;
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
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 0;
  overflow: hidden;
  transition: height .7s ease-in-out;
   ::v-deep .cube-scroll-content{
     display: inline-block
   }
   ::v-deep .cube-scroll-wrapper{
     flex: 1;
   }
  .list-wrapper{
    // width: 100%;
    display: flex;
    white-space: nowrap;
    .list-item{
      width: 150px;
      font-size: 14px;
      display: inline-block;
      margin-right: 20px;
      .father-name{
        height: 40px;
        border-bottom: 1px solid #666666;
        line-height: 40px;
        text-align: left;
        color: #333333;
        display: inline-block;
        width: 100%
      }
      .child-items{
        text-align: left;
        color: #999999;
        li{
          margin-top: 20px;
        }
      }
    }
  }
  .turn-trans{
    height: 60px;
    font-size:13px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:60px;
    color: #999999;
    .active{
      color: #333333;
    }
  }
}
.menu-active{
  height: calc(100vh - 120px);
}

</style>
