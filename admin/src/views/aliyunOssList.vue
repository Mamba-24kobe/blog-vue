<template>
  <div>
    <m-top-handle title="名称" content="上传文件" path="/oss/editor/new">
      <el-button class="fr" type="primary" @click="dialogVisible=true">上传文件</el-button>
    </m-top-handle>
    <el-table :data="ossList" border>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="type" label="类型" width="100"></el-table-column>
      <el-table-column prop="url" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.url" alt="" height="100">
        </template>
      </el-table-column>
      <el-table-column prop="url" label="类型"></el-table-column>
      <el-table-column prop="size" label="大小" width="100"></el-table-column>

      
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <!-- <el-button
            type="text"
            size="small"
            @click="$router.push(`/blogs/editor/${scope.row.name}`)"
          >编辑</el-button> -->
          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog  title="上传文件" :visible.sync="dialogVisible" width="320px" center>
      <el-form :model="form" :rules="formRules" ref="form">
        <el-form-item props="imgUrl" label="缩略图">
          <el-upload
            class="avatar-uploader"
            :action="$axios.defaults.baseURL+'/upload'"
            :headers="mixinGetToken()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.imgUrl!=''" :src="form.imgUrl" class="avatar" alt="缩略图"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        </el-form>
    </el-dialog>  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ossList: [],
        dialogVisible: false,
        form: {
          imgUrl: ''
        },
        formRules: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        let res = await this.$axios.get('/ossList')
        console.log(res)
        this.ossList = res.data.objects
      },
      async deleteHandle(data) {
        this.$confirm(`是否确定要删除 《${data.name}》 ?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let res = await this.$axios.delete(`/ossList/${data.name}`)
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
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        console.log(URL.createObjectURL(file.raw))
        this.form.imgUrl = res.url;
        this.getList()
        this.dialogVisible = false
      },
    }
  }
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>