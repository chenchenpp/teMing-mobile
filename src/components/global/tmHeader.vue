<template>
  <div class="header-main">
    <div class="header" ref="headerRef">
      <img :src="require('@/assets/images/wLogo.png')" alt="">
      <i class="iconfont" :class="[menuIcon]" @click="openMenuHandle"></i>
    </div>
    <div class="menu-content" ref="menuContentRef">
      <cube-scroll
        ref="scroll"
        :data="menuList"
        direction="horizontal"
        class="horizontal-scroll-list-wrap">
        <ul class="list-wrapper">
          <li v-for="(item, index) in menuList" :key="index" class="list-item">
            <div class="father-name" v-if="item.childrenList&&item.childrenList.length">{{item[`name${language}`]}}</div>
            <router-link class="father-name" v-else :to="`/${item.path}`">{{item[`name${language}`]}}</router-link>
            <ul class="child-items">
              <li v-for="(data, childIndex) in item.childrenList" :key="childIndex" @click="goRouter(item, data)">
                {{data[`name${language}`]}}
              </li>
            </ul>
          </li>
        </ul>
      </cube-scroll>
      <div class="turn-trans">
        <span class="china" :class="{'active': language=='CN'}" @click="changeLoacle('CN')">CN</span> |
        <span class="english" :class="{'active': language=='EN'}" @click="changeLoacle('EN')">EN</span>
      </div>
    </div>
  </div>
</template>
<script>
import {getClientHeight} from '@/util/publicMethod'
export default {
  name: 'tm-header',
  data(){
    return {
        menuList: [{
        name: '首页',
        nameEnglish: 'home',
        path: 'home'
      },{
        name: '产品中心',
        nameEnglish: 'Product Center',
        path: 'product',
        childrenList: [{
          name: '贾德系列',
          nameEnglish: 'Judd Series',
          path: 'jiade'
        },{
          name: '莫兰迪系列',
          nameEnglish: 'Morandi series',
          path: 'molandi'
        },{
          name: '密斯系列',
          nameEnglish: 'miss series',
          path: 'miss'
        },{
          name: '迪克森系列',
          nameEnglish: 'dikesen series',
          path: 'dikesen'
        },{
          name: '比尔系列',
          nameEnglish: 'bier series',
          path: 'bier'
        },{
          name: '克特林系列',
          nameEnglish: 'kelinte series',
          path: 'kelinte'
        },{
          name: '波提切利系列',
          nameEnglish: 'botiqieli series',
          path: 'botiqieli'
        },{
          name: '蒙德里安系列',
          nameEnglish: 'mengdelian series',
          path: 'mengdelian'
        }]
      },{
        name: '品牌故事',
        nameEnglish: 'Brand story',
        path: '',
        childrenList: [{
          name: '产品特色',
          nameEnglish: 'Product features',
          path: 'brandStory'
        },{
          name: '五心服务',
          nameEnglish: 'Five heart service',
          path: 'brandStory'
        }]
      },{
        name: '探索展厅',
        nameEnglish: 'exhibition hall',
        path: '',
        childrenList: [{
          name:'上海展厅',
          nameEnglish: 'Shanghai Exhibition Hall',
          path: 'exploreHall'
        }]
      },{
        name: '加入我们',
        nameEnglish: 'Join us',
        path: '',
        childrenList: [{
          name: '企业入驻',
          nameEnglish: 'Enterprise settlement',
          path: 'JoinUs'
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
  watch: {
    isMenu(newVal){
      if(newVal){
        let headerHeight=this.$refs.headerRef.clientHeight;
        let ClientHeight=getClientHeight();
        this.$refs.menuContentRef.style.height=(ClientHeight-headerHeight)+'px';
      }else{
        this.$refs.menuContentRef.style.height=""
      }
    }
  },
  created(){
    this.$EventBus.$on('showMenu', (data)=>{
      this.isMenu= data;
    });
  },
  methods: {
    openMenuHandle(){
      this.isMenu=!this.isMenu;
    },
    goRouter(item, data){
      let path = item.path ? `/${item.path}/${data.path}` : `/${data.path}`;
      this.$router.push(path)

    },
    changeLoacle(lang){
      sessionStorage.setItem('locale', lang);
      this.$EventBus.$emit('locale', lang);
    }
  }
};
</script>
<style scoped lang="scss">
.header-main{
  position: fixed;
  top: 0;
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
  padding: 0 20px;
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
  z-index: 1000;
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

</style>
