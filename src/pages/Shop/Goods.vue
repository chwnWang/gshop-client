<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUl">
          <!--currentIndex值为动态  当前的下标-->
          <li class="menu-item" :class="{current: currentIndex===index}" 
          v-for="(good,index) in goods" :key="good.name" @click="selectIndex(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
             {{good.name}}
            </span>
            
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in good.foods" :key="food.name" >
                <div class="icon" @click="showFood(food)">
                  <img width="57" height="57"
                      :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCard/>
    </div>
    <Food :food="food" ref="food"/>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../components/CartControl/CartControl'
  import ShopCard from '../../components/ShopCard/ShopCard'
  import Food from '../../components/Food/Food'
  export default {
    data(){
      return{
        scrollY:0,  //右侧列表滑动的y坐标  初始化为0  在滑动中实时改变
        tops:[],    //右侧所有li的top组成的数据,在;列表显示之后统一一次即可
        food:{}    //指定当前的的food
      }
    },
    components:{
      CartControl,
      ShopCard,
      Food
    },
    mounted(){//如果有了数据
      if (this.goods.length>0) {
        this._initScroll()
        this._initTops()
      }
    },
    /* eslint-disable */
    computed:{
      ...mapState({
        goods: state=> state.shop.goods
      }),

      currentIndex(){
        const {scrollY,tops} = this
        const index =  tops.findIndex((top,index) => scrollY >= top && scrollY < tops[index+1])
        //先进行比较  有不同的才保存
        if(index != this.index && this.leftScroll){
          this.index = index
          const li = this.$refs.leftUl.children[index];
          this.leftScroll.scrollToElement(li,500)
        }
        return index
       
      }

    },
    watch:{
      goods(){//如果没有数据
        this.$nextTick(()=>{
          this._initScroll()
          this._initTops()
        })
      }
    },
    methods:{
      //滚动条初始化
      _initScroll(){
        this.leftScroll = new BScroll(this.$refs.left,{
          click:true //分发点击事件
        })
        this.rightScroll = new BScroll(this.$refs.right,{
          click:true, //分发点击事件
          //probeType:2  触摸/       实时触发
          //probeType:3  触摸/惯性   实时触发
          probeType:1    //触摸/     非实时触发
        })
        //右侧导航绑定scroll监听
        this.rightScroll.on('scroll',({x,y})=>{
          this.scrollY = Math.abs(y)
        })
        //绑定scrollEnd监听
        this.rightScroll.on('scrollEnd',({x,y})=>{
          this.scrollY = Math.abs(y)
        })  
      },
      selectIndex(index){
        //获取top
        const top = this.tops[index]
        //立即更新scrollY的值
        this.scrollY = top //解决了左侧变白的问题
        this.rightScroll.scrollTo(0,-top,500)
      },
      _initTops(){
         const tops =[]
         let top = 0
         tops.push(top)
         //获取所有的li列表
         const lis = this.$refs.rightUl.children
         //使用forEach遍历  计算li的高度
         Array.prototype.forEach.call(lis,li => {
           top += li.clientHeight  //累加操作
           tops.push(top)  //添加到tops数组中
         })
         //更新tops数据
         this.tops = tops 
      },
      showFood(food){
        this.food = food
        this.$refs.food.isShowClick()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
