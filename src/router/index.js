import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  base: '/',
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from ,savedPosition){

    if(savedPosition) {
      return savedPosition;
    }else {
      return {top: 0}
    }
  },
  routes: [
    {
      path: '',
      redirect: '/web/home'
    },
    {
      path: '/web',
      name: 'web',
      meta: {
        needLogin: false,
      },
      component: ()=> import('../views/web/Visitor.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/web/Home.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/web/About.vue')
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/web/Product.vue')
        },
        {
          path: 'blockChain',
          name: 'blockChain',
          component: () => import('../views/web/BlockChain.vue')
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('../views/web/News.vue'),
          meta: {
            keepAlive: true,
            componentName: 'News',// 最好和文件名称一致
          }
        },
        {
          path: 'newsDetail/:id',
          name: 'newsDetail',
          component: ()=> import('../views/web/NewsDetail.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: ()=> import('../views/web/Login.vue'),
        },
      ]
    },
    {
        path: '/platform',
        name: 'platform',
        meta: {
          needLogin: true,
        },
        children: [
          {
            path: '',
            name: 'dashboard',
            meta: {
              needLogin: true,
            },
            component: () => import('../views/platform/Dashboard.vue')
          },
        ]
    },
    {
      path: '/:error*',
      redirect: '/web/home',
    },
  ]
})

router.beforeEach((to, from, next)=>{
    const store = useUserStore()
    store.initUser()
    console.log(from, to,to.meta?.needLogin, store.isLogin, store.user)
    if(to.meta?.needLogin && !store.isLogin) {
        return next('/web/login')
    }else {
        return next()
    }
})

export default router
