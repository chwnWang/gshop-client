
/**
 * 包含n个间接更改状态
 */

import {
    reqAddress,
    reqCategroys,
    reqShops
  } from '../api'
  import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGROYS,
    RECEIVE_SHOPS
  } from './mutation-type'


  export default{
    async getAddress({commit,state}){
        const {longitude, latitude} = state;
        const result = await reqAddress(longitude, latitude);
        if(result.code===0){
            const address = result.data;
            commit(RECEIVE_ADDRESS,address)
        }    
    },

    async getcategroys({commit}){
       const result = await reqCategroys();
       if(result.code===0){ 
           const categroys = result.data;
           console.log(categroys)
           commit(RECEIVE_CATEGROYS,categroys)
       }
    },

    async getshops({commit,state}){
        const {longitude, latitude} = state
        const result = await reqShops({longitude, latitude})
        if(result.code===0){
            const shops = result.data;
            commit(RECEIVE_SHOPS,shops)
        }
    }

    
  }