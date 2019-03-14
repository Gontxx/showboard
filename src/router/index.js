import Vue from 'vue'
import Router from 'vue-router'
import Takeout from '@/pages/Takeout/OverAll/OverAll'
import TakeoutRate from '@/pages/Takeout/Rate/Rate'
import TakeoutGuilin from '@/pages/Takeout/Guilin/Guilin'
import Hotel from '@/pages/Hotel/OverAll/OverAll'
import House from '@/pages/House/OverAll/OverAll'

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
      path: '/guilin',
      name: 'TakeoutGuilin',
      component: TakeoutGuilin
    },
    {
      path: '/hotel',
      name: 'Hotel',
      component: Hotel
    },
    {
      path: '/house',
      name: 'House',
      component: House
    }
  ]
})
