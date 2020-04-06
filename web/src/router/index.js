import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Home from "../views/Home.vue";
import BlogsList from "../views/BlogsList.vue";
import BlogsDetails from "../views/BlogsDetails.vue";
import Messages from "../views/Messages.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
          title: '曼巴'
        }
      },
      {
        path: "blogs",
        name: "Blogs",
        component: BlogsList,
        meta: {
          title: '博文'
        }
      },
      {
        path: "blogs/:id",
        name: "BlogsDetails",
        component: BlogsDetails,
        meta: {
          title: '博文详情'
        }
      },
      {
        path: "messages",
        name: "Messages",
        component: Messages,
        meta: {
          title: '留言'
        }
      },
      {
        path: "friends",
        name: "webFriends",
        component: () => import("../views/WebFriends.vue"),
        meta: {
          title: 'web圈'
        }
      },
    ]
  },
  {
    path: "/abouts",
    name: "AboutMe",
    component: () => import("../views/AboutMe.vue"),
      meta: {
        title: '关于我'
      }
  },
  // {
  //   path: "/emojiPicker",
  //   name: "EmojiPicker",
  //   component: () => import("../EmojiPicker.vue"),
  //   meta: {
  //     title: '曼巴'
  //   }
  // }

];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router;
