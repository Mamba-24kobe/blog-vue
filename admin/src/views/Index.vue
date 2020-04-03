<template>
  <div>
    <el-container style="height: 100vh;">
      <el-container>
        <el-header class="d-flex jc-between ai-center">
          <img src="../assets/logo.png" alt="logo" width="70px" />
          <div class="menu-btn">
            <el-dropdown @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 15px; line-height:60px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="`/admins/editor/${userInfo._id}`">查看</el-dropdown-item>
                <el-dropdown-item command="/login">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>Hello {{userInfo.username}} ！</span>
            <i class="el-icon-menu" @click="drawer = true"></i>
          </div>
        </el-header>
        <el-main>
          <el-page-header
            @back="goBack"
            :content="`${titleText}${$route.meta.name}`"
            class="goBack"
          ></el-page-header>
          <el-card class="box-card">
            <router-view :key="$route.path"></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer :visible.sync="drawer" direction="rtl" size="40%">
      <el-menu
        router
        unique-opened
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        @select="drawer = false"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span slot="title">内容管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">博文管理</template>
            <el-menu-item index="/blogs/editor/new">新建博文</el-menu-item>
            <el-menu-item index="/blogs/list">博文列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">标签管理</template>
            <el-menu-item index="/tags/editor/new">新建Tag</el-menu-item>
            <el-menu-item index="/tags/list">Tags列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">博文评论</template>
            <el-menu-item index="/comments/list">评论列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">留言</template>
            <el-menu-item index="/messages/list">留言列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">留言评论用户</template>
            <el-menu-item index="/users/list">留言评论用户列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">web圈</template>
            <el-menu-item index="/friends/editor/new">新建web圈</el-menu-item>
            <el-menu-item index="/friends/list">web圈列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">文件管理</span>
          </template>
          <el-menu-item index="/oss/list">图片列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">登陆管理</template>
            <el-menu-item index="/admins/editor/new">新建管理员</el-menu-item>
            <el-menu-item index="/admins/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      titleText: "",
      tableData: Array(20).fill(item),
      userInfo: {},
      isCollapse: false,
      isShowMenu: false,
      drawer: false
    };
  },
  watch: {
    $route(newV, oldV) {
      this.titleText = newV.params.id
        ? newV.params.id == "new"
          ? "新建"
          : "编辑"
        : "";
    }
  },
  created() {
    if (localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }
  },
  methods: {
    handleCommand(command) {
      console.log("loginOut");
      if (command == "/login") {
        localStorage.clear();
      }
      this.$router.push(command);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #8600ff;
  color: #fff;
  line-height: 60px;
}
.el-icon-setting {
  color: #fff;
}
.el-aside {
  color: #333;
  // border-right: 3px solid #e6e6e6;
}
.coll-btn {
  text-align: right;
  font-size: 24px;
  line-height: 24px;
  color: #ffb929;
}
.menu-btn {
  // position: relative;
  .el-icon-menu {
    margin-left: 10px;
    font-size: 24px;
    line-height: 60px;
    color: #ffb929;
  }
}
.el-drawer__header {
  margin-bottom: 10px;
}
.goBack {
  margin-bottom: 20px;
}
</style>


<style>
.el-drawer__header {
  margin-bottom: 10px !important;
}
.el-drawer__body{
  overflow-y: auto!important;
}
</style>