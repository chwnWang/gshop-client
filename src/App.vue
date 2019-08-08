<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.footerShow"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from './components/FooterGiude/FooterGiude.vue'
  export default {
    mounted(){
      //页面加载之后  调用定位的方法
      this.$store.dispatch('getAddress')
    },

    components:{
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app
  width 100%
  height 100%
  background #f5f5f5
  position relative
 
</style>
