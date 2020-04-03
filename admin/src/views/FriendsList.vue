<template>
  <div>
    <m-top-handle title="站名" content="新建web圈" path="/friends/editor/new"></m-top-handle>
    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="nickName" label="站名"></el-table-column>
      <el-table-column prop="avatarImg" label="logo">
          <template slot-scope="scope">
            <img :src="scope.row.avatarImg" alt height="50" />
          </template>
        </el-table-column>

      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span v-if="scope.row.isPass">已通过审核</span>
          <el-button v-else type="primary" size="small" @click="auditHandle(scope.row)">审核</el-button>    
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/friends/editor/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      title: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$axios.get("/rest/friends");
      this.tableData = res.data;
    },
    async auditHandle(data) {
      data.isPass = true
      await this.$axios.put(`/rest/friends/${data._id}`, data);
      this.getList();
    },
    deleteHandle(data) {
      this.$confirm(`是否确定要删除 《${data.title}》 ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$axios.delete(`/rest/friends/${data._id}`);
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>