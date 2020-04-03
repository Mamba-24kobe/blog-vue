<template>
  <div>
    <m-top-handle title="标题" content="写博客" path="/blogs/editor/new"></m-top-handle>
    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="tags" label="Tags">
        <template slot-scope="scope">
          <span>{{scope.row.tags.map(v => v.label).join('--')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/blogs/editor/${scope.row._id}`)"
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
      let res = await this.$axios.get("/rest/blogs");
      this.tableData = res.data;
    },
    deleteHandle(data) {
      this.$confirm(`是否确定要删除 《${data.title}》 ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$axios.delete(`/rest/blogs/${data._id}`);
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