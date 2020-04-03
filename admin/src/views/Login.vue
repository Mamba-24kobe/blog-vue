<template>
  <div class="login">
    <el-page-header @back="$router.push('/')" title="首页" content="登陆" class="goBack"></el-page-header>
    <div class="login-box d-flex ai-center jc-center">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户登陆</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: { required: true, message: "必填", trigger: "change" },
        password: { required: true, message: "必填", trigger: "change" }
      }
    };
  },
  methods: {
    loginSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post("/login", this.ruleForm);
          console.log(res);
          this.$message.success("登陆成功");
          localStorage.token = res.data.token;
          localStorage.userInfo = JSON.stringify(res.data.user);
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login{
  height: 100vh;
}
.login-box{
  width: 100%;
  height: calc(100vh - 44px);
}
.box-card {
  width: 300px;
}
.goBack{
  padding: 20px 0 0 20px;
}
</style>