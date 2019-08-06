<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide/>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from './components/FooterGiude/FooterGiude.vue'
  export default {
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
