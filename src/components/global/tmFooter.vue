<template>
  <div class="footer">
    <ul class="contact-items">
      <li v-for="(data, index) in contactList" :key="index">
        <i class="iconfont" :class="[data.iconfont]"></i>
      </li>
    </ul>
    <p class="tm-address" v-html="address[`info${language}`]"></p>
  </div>
</template>
<script>

export default {
  name:'tm-footer',
  data(){
    let pliceImg= require('@/assets/images/police.png');
    return {
      address: {
        info: `Copyright @2010 - 2020上海特铭家具有限公司  沪ICP备19034031号-1</br> <img width="12px" src='${pliceImg}' alt=""> 沪公网安备 31011402008858号`,
        infoEnglish: 'Copyright @ 2010-2020 Shanghai TeMing Furniture Co., Ltd. huicp No. 19034031-1',
      },
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
  padding: 0 20px;
  margin-top: 40px;
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
    line-height:12px;
  }
}
</style>

