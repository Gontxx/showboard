import Vue from 'vue'
import Router from 'vue-router'
import Takeout from '@/pages/Takeout/OverAll/OverAll'
import TakeoutRate from '@/pages/Takeout/Rate/Rate'
import TakeoutTianjin from '@/pages/Takeout/TianjinRate/Rate'
import TakeoutGuilin from '@/pages/Takeout/Guilin/Guilin'
import TakeoutXilinguole from '@/pages/Takeout/Xilinguole/OverAll'
import Hotel from '@/pages/Hotel/OverAll/OverAll'
import SecondHand from '@/pages/House/SecondHand/OverAll'
import Rent from '@/pages/House/Rent/OverAll'
import HouseSold from '@/pages/House/SecondHandSold/OverAll'
import Company from '@/pages/Company/OverAll/OverAll'
import PiYao from '@/pages/Rumor/Refute/Refution'
import Weibo from '@/pages/Rumor/Weibo/Weibo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Takeout
    },
    {
      path: '/takeout-rate',
      name: 'TakeoutRate',
      component: TakeoutRate
    },
    {
      path: '/takeout-tianjin',
      name: 'TakeoutTianjin',
      component: TakeoutTianjin
    },
    {
      path: '/guilin',
      name: 'TakeoutGuilin',
      component: TakeoutGuilin
    },
    {
      path: '/takeout-xilinguole',
      name: 'TakeoutXilinguole',
      component: TakeoutXilinguole
    },
    {
      path: '/hotel',
      name: 'Hotel',
      component: Hotel
    },
    {
      path: '/house',
      name: 'SecondHand',
      component: SecondHand
    },
    {
      path: '/rent',
      name: 'Rent',
      component: Rent
    },
    {
      path: '/house-sold',
      name: 'HouseSold',
      component: HouseSold
    },
    {
      path: '/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/refute',
      name: 'PiYao',
      component: PiYao
    },
    {
      path: '/weibo',
      name: 'Weibo',
      component: Weibo
    }
  ]
})
