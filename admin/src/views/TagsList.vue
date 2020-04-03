<template>
  <div>
    <m-top-handle title="Tag" content="新建Tag" path="/tags/editor/new"></m-top-handle>
    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="parent.label" label="上级Tag"></el-table-column>
      <el-table-column prop="label" label="Tag"></el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/tags/editor/${scope.row._id}`)"
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
      tableData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$axios.get("/rest/tags");
      this.tableData = res.data;
    },
    async deleteHandle(data) {
      await this.$axios.delete(`/rest/tags/${data._id}`);
      this.getList();
    }
  }
};
</script>

<style>
</style>