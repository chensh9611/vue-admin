import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 路由骨架 Layout */
import Layout from '@/layout'
/*
* 常量路由：任何用户都可以看见的---首页、登录
* */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]
// 异步路由：不同的用户（角色），需要过滤筛选出来的路由
export const asyncRoutes = [
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    redirect: '/product/trademark',
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'trademark',
        name: 'Trademark',
        component: () => import('../views/product/tradeMark/TradeMark.vue'),
        meta: { title: '品牌' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('../views/product/Attr/Attr.vue'),
        meta: { title: '商品属性管理' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('../views/product/Spu/Spu.vue'),
        meta: { title: 'Spu管理' }
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('../views/product/Sku/Sku.vue'),
        meta: { title: 'Sku管理' }
      }
    ]
  },
  {
    path: '/acl',
    component: Layout,
    name: 'Acl',
    redirect: '/acl/user',
    meta: { title: '权限管理', icon: 'el-icon-lock' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/permission/user/User.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/permission/role/Role.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('../views/permission/menu/Menu.vue'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'roleAuth/:id',
        name: 'RoleAuth',
        component: () => import('../views/permission/role/RoleAuth.vue'),
        meta: { activeMenu: '/permission/role', title: '角色授权' },
        hidden: true
      }
    ]
  }
]

// 任意路由
export const anyRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
