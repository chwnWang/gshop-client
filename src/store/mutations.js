/**包含几个直接更新状态的数据方法的对象 */

import {
    RECEIVE_SHOPS,
    RECEIVE_CATEGROYS,
    RECEIVE_ADDRESS
} from './mutation-type'

export default{

    [RECEIVE_SHOPS] (state,shops) {
        state.shops = shops
    },

    [RECEIVE_CATEGROYS] (state,categroys) {
        state.categroys = categroys
    },

    [RECEIVE_ADDRESS] (state,address) {
       state.address = address
    }
}

