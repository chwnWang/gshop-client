/**
 * 拦截器
 */

 import axios from 'axios'
 import qs from 'qs'
 import {Toast} from 'mint-ui'
 import store from '../store'
 import router from '../router'

 axios.interceptors.request.use(config=>{
     const {method,data} = config
     if(method.toUpperCase() === 'POST' && data instanceof Object){
         config.data = qs.stringify(data)
     } 
     if(config.headers.needToken){
       const token = store.state.user.token
       //没有,不发请求
       if(!token){ 
         const error = new Error('没有token,不发请求')
         error.state = 401
         throw error
       }else{
         //有  添加到请求头中
         config.headers['Authorization'] = token
       }
     }

     return config
 }),


 axios.interceptors.response.use(response=>{
   return response.data
 },error=>{
   const {response,state,message} = error
  //发请求前没有需要的token
  if(!response){
    if(state===401){
      if(router.currentRoute.path!=='/login'){
         //提示
         Toast(message)
         //跳转登录页面
         router.replace('/login')
      }
      
    }
  }else{
    const state = response.state
    //发送了请求  token过期
    if(state===401){
      if(router.currentRoute.path!=='/login'){
        Toast(response.data.message)
        //退出登录
        store.dispatch('logout')  //因为这次有Token
        //跳转到登录页面
        router.replace('/login')   
      }
    }else if(state === 404){  //请求资源不存在
      Toast('请求的资源不存在')
    }else{
      Toast('请求错误'+message)
    }
  }
   
  //发送  koken过期
   alert('请求异步'+error.message)
   return new Promise(()=>{})  //返回一个pending的promise对象  中断promise链
 });

 export default axios;