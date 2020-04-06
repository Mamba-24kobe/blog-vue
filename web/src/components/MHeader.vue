<template>
  <div>
    <header class="header-box" :class="isScrolling ? `mini bgGrad-right` : ''">
      <div class="d-flex container">
        <div
          class="bgGrad-right mamba-box d-flex ai-end jc-between col-white"
          @click="$router.push('/')"
        >
          <i :class="`iconfont ${vuex_skin_obj.icon}`"></i>
          <!-- <strong class="icon-f">{{vuex_skin_obj.first}}</strong> -->
          <strong class="fs-4xl">{{vuex_skin_obj.behind}}</strong>
        </div>
        
        <div class="bgCol-more flex-1 d-flex jc-end ai-center">
          <theme-picker class="flex-1 d-flex jc-center ai-center col-white">
            <slot></slot>
          </theme-picker>
          <el-dropdown trigger="click" @visible-change="v => isShowMenu = v">
            <div
              class="menu-button"
              @click="isShowMenu = !isShowMenu"
              :class="{'isShowMenu': isShowMenu}"
            >
              <i></i>
              <i></i>
              <i></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link tag="div" to="/">首页</router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <router-link tag="div" to="/blogs">博文</router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <router-link tag="div" to="/friends">web圈</router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <router-link tag="div" to="/messages">留言</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="router-box d-flex ai-center col-white fs-4xl">
            <router-link :class="{'col-less border-less' : activeRoute == r.path}" class="router-item hover-more" tag="div" :to="r.path" v-for="(r, i) in routerList" :key="i">
              {{r.name}}
            </router-link>
          </div>
          <!-- <el-menu
            router
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            :background-color="#8600ff"
            text-color="#fff"
            active-text-color="#ffb929"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/blogs">博文</el-menu-item>
            <el-menu-item index="/webFriends">web圈</el-menu-item>
            <el-menu-item index="/messages">留言</el-menu-item>
          </el-menu> -->
        </div>
      </div>
    </header>
  </div>
</template>

<script>
// import theme from '@/styles.scss'
// console.log(theme,'skin')
import ThemePicker from './ThemePicker'
import {mapState,mapMutations} from 'vuex'
export default {
  props: {
    isScrolling: Boolean
  },
  components: {
    ThemePicker
  },
  data() {
    return {
      isShowMenu: false,
      isTop: false,
      routerList: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '博文',
          path: '/blogs'
        },
        {
          name: 'web圈',
          path: '/friends'
        },
        {
          name: '留言',
          path: '/messages'
        },
      ],
      activeRoute: '',
    };
  },
  computed: {
    ...mapState(['vuex_skin_obj'])
  },

  created() {
    console.log(this.$route)
    this.activeRoute = this.$route.path
  },
  watch: {
    $route(newV, oldV) {
      this.activeRoute = this.$route.path
    }
  },
  methods: {
    ...mapMutations(['vuex_set_skin_obj']),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.header-box {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding-top: 20px;
  z-index: 2000;
  transition: 0.6s ease-in-out;
  .mamba-box {
    cursor: pointer;
    height: 60px;
    padding: 0 20px 6px 20px;
    .iconfont {
      font-size: 40px;
      margin-right: 5px;
    }
    // .icon-f{
    //   font-size: 36px;
    //   line-height: 1;
    //   margin-right: 5px;
    //   border: 1px solid #fff;
    //   border-radius: 10px;    
    // }
  }
}
.mini {
  padding-top: 0px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
}
.router-box{
  height: 60px;
  .router-item{
    height: 60px;
    line-height: 58px;
    cursor: pointer;
    padding: 0 20px;
  }
}
.menu-button {
  padding: 5px 0;
  border: none;
  display: none;
  margin-right: 20px;
  i {
    display: block;
    width: 24px;
    height: 3px;
    background-color: #fff;
    margin: 5px auto;
    transition: 0.2s ease-in-out;
  }
}
.isShowMenu {
  i {
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(1) {
      transform: translateY(8px) rotate(-45deg);
    }
    &:nth-child(3) {
      transform: translateY(-8px) rotate(45deg);
    }
  }
}
.el-dropdown-link{
  cursor: pointer;
}
// .el-menu.el-menu--horizontal {
//   border: none;
// }
// .el-menu-demo {
//   font-size: 16px;
// }
@media screen and (max-width: 768px) {
  .header-box {
    padding-top: 0;
  }
  .router-box {
    display: none;
  }
  .menu-button {
    display: block;
  }
}
</style>
<style>
/* .el-menu--horizontal > .el-menu-item {
  font-size: 16px;
} */
.el-dropdown-menu__item {
  text-align: center;
  width: 80px;
  padding: 0 0px !important;
}
.el-dropdown-menu__item--divided:before {
  margin: 0 !important;
}
</style>