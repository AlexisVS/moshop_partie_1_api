import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/shops',
    component: () => import(/* webpackChunkName: "Shops" */ '../views/Shop/Shops.vue')
  },
  {
    path: '/shops/:id',
    component: () => import(/* webpackChunkName: "Shop" */ '../views/Shop/Shop.vue')
  },
  {
    path: '/articles/:id',
    component: () => import(/* webpackChunkName: "Article" */ '../views/Shop/Article.vue')
  },
  {
    path: '/panier',
    component: () => import(/* webpackChunkName: "Panier" */ '../views/Panier.vue')
  },
  {
    path: "/my-shop",
    component: () => import(/* webpackChunkName: "MyShop" */ '../views/Shop/Myshop.vue')
  },
  { 
    path: '/commandes',
    component: () => import(/* webpackChunkName: "Commandes" */ '../views/Commandes.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   let isLoggedIn;
//   isLoggedIn = localStorage.getItem('isLoggedIn')
//   to.path !== '/' && isLoggedIn == true
//   ? next()
//   : next(false)
// })

export default router
