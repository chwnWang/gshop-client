import ajax from './ajax'

const BASE = '/api'

export const reqAddress = (longitude, latitude) => ajax({
    method: 'GET',
    url: BASE + `/position/${latitude},${longitude}`
})

/* 
2. 获取食品分类列表
*/
export const reqCategroys = () => ajax.get(BASE + '/index_category')


/* 
3. 根据经纬度获取商铺列表
*/
export const reqShops = ({ latitude, longitude }) => ajax({
    url: BASE + '/shops',
    params:{
      latitude,
      longitude
    }
})
