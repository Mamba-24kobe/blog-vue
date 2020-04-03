<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="名称" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      ruleForm: {
        password: "",
        username: ""
      },
      rules: {
        username: { required: true, message: "必填", trigger: "change" },
        password: { required: true, message: "必填", trigger: "blur" }
      }
    };
  },
  created() {
    this.id != 'new' && this.getEditInfo();
  },
  methods: {
    getEditInfo() {
      console.log("getEditInfo");
      this.$axios.get(`/rest/admins/${this.id}`).then(res => {
        this.ruleForm = res.data;
      });
    },
    saveForm(formName) {
      if (this.id!='new') {
        this.rules.password.required = false
      }
      this.$refs[formName].validate( async valid => {
        if (valid) {
          let res;
          if (this.id!='new') {
            res = await this.$axios.put(`/rest/admins/${this.id}`, this.ruleForm);
          } else {
            res = await this.$axios.post("/rest/admins", this.ruleForm);
          }
          console.log(res);
          this.$router.push("/admins/list");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style>
</style>