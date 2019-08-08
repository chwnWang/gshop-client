<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot='right'>
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
   
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categroys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(categroy, index) in categroys" :key="index">
             <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + categroy.image_url">
              </div>
              <span>{{categroy.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <Shops></Shops>
  </section>
</template>

<script type="text/ecmascript-6">
  import Shops from '../../components/Shops/Shops.vue'
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  
  export default {
    
    mounted(){
      this.$store.dispatch('getshops')
      this.$store.dispatch('getcategroys')
    },
    
    computed: {
      ...mapState(['address','categroys']),
                              
       categorysArr(){
        //定义一个大数组
         const bigArr = []
        //定义一个小数组
        let smallArr = []
        //获取商品列表的数据
        const {categroys} = this
        //遍历总数组
        console.log(categroys)
         console.log(this)
        categroys.forEach(categroy => {
          //将小数组添加到大数组中
          if(smallArr.length===0){
            bigArr.push(smallArr)
          }
          //将数据添加到小数组中
          smallArr.push(categroy)
          //如果小数组的最大长度为8
          if(smallArr.length===8){
            smallArr = []
          }
        });
        return bigArr
      }
    },
    watch:{
      categroys(){
        this.$nextTick(()=>{
          new Swiper('.swiper-container', {
            loop: true, // 循环模式
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    },
    components:{
      Shops
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
