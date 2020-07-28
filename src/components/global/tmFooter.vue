<template>
  <div class="footer">
    <ul class="contact-items">
      <li v-for="(data, index) in contactList" :key="index">
        <i class="iconfont" :class="[data.iconfont]"></i>
      </li>
    </ul>
    <p class="tm-address">
      Copyright @2010 - 2020上海特铭家具有限公司  沪ICP备19034031号-1
    </p>
  </div>
</template>
<script>
export default {
  name:'tm-footer',
  data(){
    return {
      contactList: [{
        name: 'qq',
        iconfont: 'iconqq1'
      },{
        name: 'weChat',
        iconfont: 'iconweixin'
      },{
        name: 'weibo',
        iconfont: 'iconweibo'
      }, {
        name: 'tuite',
        iconfont: 'icontuite'
      },{
         name: 'facebook',
        iconfont: 'iconfacebook'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.footer{
  position: fixed;
  bottom: 0;
  padding: 0 20px;
  padding-top: 10px;
  width: 100%;
  box-sizing: border-box;
  .contact-items{
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    background: #F3F3F3;
    li{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #999999;
      color: #999999;
      display: flex;
      align-items: center;
      justify-content: center
    }
  }
  .tm-address{
    font-size: 10px;
    padding: 10px 0;
    color: #999999;
  }
}
</style>

