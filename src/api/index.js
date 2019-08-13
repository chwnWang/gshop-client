import ajax from './ajax'

const BASE = '/api'

export const reqAddress = (longitude, latitude) => ajax({
    method: 'GET',
    url: BASE + `/position/${latitude},${longitude}`
})

/* 
2. 获取食品分类列表
*/           
export const reqCategroys = () => ajax.get(BASE + '/index_category',{
  headers:{
    needToken: true
  }
})


/* 
3. 根据经纬度获取商铺列表
*/
export const reqShops = ({ latitude, longitude }) => ajax({
    url: BASE + '/shops',
    params: {
      latitude,
      longitude
    },
    headers: {
      needToken:true
    }
})

/**
 * 4.手机发送验证码
 */
export const reqSendCode = (phone) => ajax.get(BASE + '/sendcode', {
  params: {
    phone
  }
})

/* 
5. 用户名密码登陆
*/
export const reqPwdLogin = ({
  name,
  pwd,
  captcha
}) => ajax.post(BASE + '/login_pwd', {
  name,
  pwd,
  captcha
})

/* 
6. 手机号短信验证码登陆
*/
export const reqSmsLogin = (phone, code) => ajax.post(BASE + '/login_sms', {
  phone,
  code
})

/**
 * 自动登录
 */
export const reqAutoLogin = () => ajax({
  url: BASE + '/auto_login',
  headers: {
    needToken: true
  }
})

/**
 * 获取商家信息
 */
export const reqInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqGoods = () => ajax('/goods')