/* 
管理shop功能模块相关状态数据的vuex模块
*/
import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  REDUCE_FOOD_COUNT,
  ADD_FOOD_COUNT,
  CLEAR_CART
}  from '../mutation-type'

import {
  reqGoods,
  reqRatings,
  reqInfo,
} from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cardFoods:[]//购物车的商品数量
}
const mutations = {
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [CLEAR_CART](state) {
    state.cardFoods.forEach(food => {
      food.count = 0
    });
    state.cardFoods=[]
  },

  [ADD_FOOD_COUNT](state,{food}) {
    if(food.count){
      food.count++
    }else{
      Vue.set(food, 'count', 1)
      state.cardFoods.push(food)
    }
  },
  [REDUCE_FOOD_COUNT](state,{food}) {
    if(food.count>0){
      food.count--
      if(food.count===0){
        state.cardFoods.splice(state.cardFoods.indexOf(food),1)
      }
    }
  },
}
const actions = {
  // 异步获取商家信息
  async getInfo({commit}, cb) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
      typeof cb === 'function' && cb()
    }
  },

  // 异步获取商家评价列表
  async getRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})

      typeof cb === 'function' && cb()
    }
  },

  // 异步获取商家商品列表
  async getGoods({commit}, cb) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      typeof cb === 'function' && cb()
    }
  },
  /**更新商品添加到购物车的数量 */
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(ADD_FOOD_COUNT,{food})
    }else{
      commit(REDUCE_FOOD_COUNT,{food})
    }
  }

}

const getters = {
  totalCount(state){
    return state.cardFoods.reduce((pre,food)=>pre + food.count,0)
  },

  totalPrice(state){
    return state.cardFoods.reduce((pre,food)=> pre + food.count*food.price,0 )
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}