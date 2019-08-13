import Login from '../pages/Login/Login.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
import MSite from '../pages/MSite/MSite.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods.vue'
import Info from '../pages/Shop/Info.vue'
import Ratings from '../pages/Shop/Ratings.vue'

/*配置所有的路由组件 */
export default[
        {
          path: '/login',
          component: Login
        },
        {
            path: '/msite',
            component: MSite,
            meta:{
                footerShow: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta:{
                footerShow: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta:{
                footerShow: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta:{
              footerShow: true
            }
           
        },
        {
            path: '/shop',
            component: Shop,
            children:[
                {
                    path:'/shop/ratings',
                    component:Ratings
                },{
                    path:'/shop/goods',
                    component:Goods
                },{
                    path:'/shop/info',
                    component:Info
                },{
                    path:'',
                    redirect:'/shop/goods'
                }
            ]  
        },
        {
            path: '/',
            redirect: '/msite'
        },
    ]