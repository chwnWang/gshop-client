/**
 * 拦截器
 */

 import axios from 'axios'
 import qs from 'qs'

 axios.interceptors.request.use(config=>{
     const {method,data} = config
     if(method.toUpperCase() === 'POST' && data instanceof Object){
         config.data = qs.stringify(data)
     }
     return config
 }),


 axios.interceptors.response.use(response=>{
   return response.data
 },error=>{
   alert('请求异步'+error.message)
   return new Promise(()=>{})  //返回一个pending的promise对象  中断promise链
 });

 export default axios;