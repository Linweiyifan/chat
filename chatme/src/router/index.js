import Vue from 'vue'
import Router from 'vue-router'
import Chatme from '@/components/ChatMe'
import Layout from '@/components/Layout'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'chatme',
          component: Chatme,
        }
      ]
    }
  ]
})
