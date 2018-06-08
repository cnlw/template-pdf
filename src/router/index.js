import Vue from 'vue'
import Router from 'vue-router'
import pdfmake from '@/components/pdfmake.vue'
import testHello from '@/components/testHello.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pdfmake',
      component: pdfmake
    }
    ,
    {
      path: '/testHello',
      name: 'testHello',
      component: testHello
    }
  ]
})
