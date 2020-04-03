import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { isPublic: true, name: '登陆'}
  },
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {name: '首页'}
      },
      {
        path: 'blogs/List',
        name: 'BlogsList',
        component: () => import('../views/BlogsList.vue'),
        meta: {name: '博文列表'}
      },
      {
        path: 'blogs/editor/:id',
        name: 'BlogsEditor',
        component: () => import('../views/BlogsEditor.vue'),
        meta: {name: '博文'}
      },
      {
        path: 'comments/List',
        name: 'CommentList',
        component: () => import('../views/CommentsList.vue'),
        meta: {name: '博文评论列表'}
      },
      {
        path: 'tags/editor/:id',
        name: 'TagsEditor',
        component: () => import('../views/TagsEditor.vue'),
        meta: {name: 'Tag'}
      },
      {
        path: 'tags/List',
        name: 'TagsList',
        component: () => import('../views/TagsList.vue'),
        meta: {name: 'Tags列表'}
      },
      {
        path: 'comments/editor/:id',
        name: 'CommentEditor',
        component: () => import('../views/CommentsEditor.vue'),
        meta: {name: '博文评论'}
      },
      {
        path: '/users/List',
        name: 'UsersList',
        component: () => import('../views/UsersList.vue'),
        meta: {name: '留言评论用户列表'}
      },
      {
        path: '/users/editor/:id',
        name: 'UsersEditor',
        component: () => import('../views/UsersEditor.vue'),
        meta: {name: '留言评论用户'}
      },
      {
        path: '/messages/List',
        name: 'MessagesList',
        component: () => import('../views/MessagesList.vue'),
        meta: {name: '留言列表'}
      },
      {
        path: '/messages/editor/:id',
        name: 'MessagesEditor',
        component: () => import('../views/MessagesEditor.vue'),
        meta: {name: '留言'}
      },
      {
        path: '/friends/List',
        name: 'FriendsList',
        component: () => import('../views/FriendsList.vue'),
        meta: {name: 'web圈列表'}
      },
      {
        path: '/Friends/editor/:id',
        name: 'FriendsEditor',
        component: () => import('../views/FriendsEditor.vue'),
        meta: {name: 'web圈'}
      },
      {
        path: '/oss/list',
        name: 'aliyunOssList',
        component: () => import('../views/aliyunOssList.vue'),
        meta: {name: 'OSS文件列表'}
      },
      {
        path: '/admins/editor/:id',
        name: 'adminsEditor',
        component: () => import('../views/adminsEditor.vue'),
        meta: {name: '管理员'}
      },
      {
        path: '/admins/list',
        name: 'adminsList',
        component: () => import('../views/adminsList.vue'),
        meta: {name: '管理员'}
      },
      
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  //   meta: {name: '关于'}
  // }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic&&!localStorage.token) {
      Vue.prototype.$message({
        type: 'error',
        message: '请登陆'
      })
      return next('/login')
  }
  next()
  // to and from are both route objects
})
export default router
