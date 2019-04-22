import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Login from './views/login.vue'
import Page from './views/pages/page.vue'

import Allot from './views/pages/allot.vue'
import Gallery from './views/pages/gallery.vue'
import Price from './views/pages/price.vue'
import Rules from './views/pages/rules.vue'
import Product from './views/pages/product.vue'
import ProductList from './views/pages/productList.vue'
import QuotaByClassify from './views/pages/quotaByClassify.vue'
import QuotaByProduct from './views/pages/quotaByProduct.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/allot',
      // hidden: true
    },
      {
        path: '/login',
        name: 'login',
        component: Login,
        // hidden: true
      },
      {
        path: '/',
        component: Home,
        name: '产品分配',
        // iconCls: 'fa fa-id-card-o magrin-right-10',
        children: [
            { path: '/allot', component: Allot, name: '高级分配'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '配额管理',
        // iconCls: 'fa fa-id-card-o magrin-right-10',
        children: [
            { path: '/quotaByClassify', component: QuotaByClassify, name: '按分类管理' },
            { path: '/quotaByProduct', component: QuotaByProduct, name: '按产品管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '定价管理',
        // iconCls: 'fa fa-id-card-o magrin-right-10',
        children: [
            { path: '/price', component: Price, name: '按分类定价' },
            { path: '/rules', component: Rules, name: '按产品定价' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        // iconCls: 'fa fa-address-card magrin-right-10',
        // leaf: true, // 只有一个节点
        children: [
            { path: '/gallery', component: Gallery, name: '产品图库' }
        ]
    },
     {
        path: '/',
        component: Home,
        name: '',
        // iconCls: 'fa fa-address-card magrin-right-10',
        // leaf: true,
        children: [
          { path: '/productList', component: ProductList, name: '产品档案' }
        ]
    }
  ],
});
