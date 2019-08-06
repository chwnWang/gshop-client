import Login from '../pages/Login/Login.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
import MSite from '../pages/MSite/MSite.vue'

/*配置所有的路由组件 */
export default[
        {
          path: '/login',
          component: Login
        },
        {
            path: '/msite',
            component: MSite
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/profile',
            component: Profile
        },
        {
            path: '/order',
            component: Order
        },
        {
            path: '/',
            redirect: '/msite'
        },
    ]