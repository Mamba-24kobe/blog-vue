<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="上级Tag" prop="parent">
        <el-select v-model="ruleForm.parent" placeholder="请选择">
          <el-option
            v-for="item in parent"
            :key="item._id"
            :label="item.label"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Tag名称" prop="label">
        <el-input v-model="ruleForm.label"></el-input>
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
        parent: "",
        label: ""
      },
      parent: [],
      rules: {
        label: { required: true, message: "必填", trigger: "change" }
      }
    };
  },
  created() {
    this.id !== 'new' && this.getEditInfo();
    this.getParentList()
  },
  methods: {
    async getParentList() {
      let res = await this.$axios.get("/rest/tags");
      this.parent =  res.data
    },
    getEditInfo() {
      console.log("getEditInfo");
      this.$axios.get(`/rest/tags/${this.id}`).then(res => {
        this.ruleForm = res.data;
      });
    },
    saveForm(formName) {
      this.$refs[formName].validate( async valid => {
        if (valid) {
          let res;
          if (this.id !== 'new') {
            res = await this.$axios.put(`/rest/tags/${this.id}`, this.ruleForm);
          } else {
            res = await this.$axios.post("/rest/tags", this.ruleForm);
          }
          console.log(res);
          this.$router.push("/tags/list");
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