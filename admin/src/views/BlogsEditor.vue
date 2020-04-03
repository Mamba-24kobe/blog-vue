<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="博文标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="博文描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="博文正文">
        <mavon-editor
          code_style="monokai-sublime"
          :ishljs="true"
          v-model="form.content"
          ref="mavon"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
        />
      </el-form-item>
      <!-- <el-form-item label="缩略图">
          <el-upload
            class="avatar-uploader"
            :action="$axios.defaults.baseURL+'/upload'"
            :show-file-list="false"
            :on-success="res => $set(form, 'imgUrl', res.url)"
          >
            <img v-if="form.imgUrl!=''" :src="form.imgUrl" class="avatar" alt="缩略图"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-form-item>-->
      <el-form-item label="缩略图">
        <el-input v-model="form.imgUrl"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <!-- <el-tag
            :key="tag"
            v-for="tag in form.tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
        <el-cascader
          ref="cascader"
          v-model="form.tags"
          :options="options"
          :props="{ multiple: true, checkStrictly: true }"
          @change="handleChange"
          clearable
        >
          <template slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf">({{ data.children.length }})</span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item label="博文作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.time" style="width: 100%"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          <span v-if="id == 'new'">发布博文</span>
          <span v-else>修改博文</span>
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "mavon-editor/dist/markdown/github-markdown.min.css";
// import marked from "marked";
export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      id: this.$route.params.id,
      // create edit
      mode: "create",
      dateFormat: "yyyy-MM-dd hh:mm:ss",
      inputVisible: false,
      inputValue: "",
      form: {
        title: "",
        description: "",
        content: "",
        imgUrl: "",
        tags: [],
        author: "可可",
        time: new Date()
      },
      options: [],
      parentTagsList: []
    };
  },
  created() {
    this.id != "new" && this.getBlogsList();
    this.getTags();
  },
  beforeDestroy() {
    this.onSubmit()
  },
  // beforeRouteLeave(to, form, next) {
  //    this.$confirm(//自定义提示弹窗
  //      "You have unsaved changes in this page. Do you want to leave without saving?",
  //      {
  //        cancelButtonText: "Cancel",
  //        confirmButtonText: "Yes",
  //        closeClickModel: false
  //      }
  //    )
  //      .then(() => {
  //        next();
  //      })
  //      .catch(() => {
  //        next(false);
  //      });
  // },
  methods: {
    async getBlogsList() {
      let res = await this.$axios.get(`/rest/blogs/${this.id}`);
      console.log(res);
      this.form = res.data;
      // this.form.imgUrl = 'http://coco727.oss-cn-hongkong.aliyuncs.com/2e667ea22844cbcafbdcc374dc27c9ce.jpg'
    },
    async getTags() {
      let res = await this.$axios.get("/rest/tags");
      let tagsList = res.data;
      this.parentTagsList = res.data.filter(v => !v.parent);

      this.parentTagsList.forEach(el => {
        el.children = tagsList.filter(c => {
          if (c.parent) {
            return c.parent._id == el._id;
          }
        });
      });
      console.log(this.parentTagsList);

      this.options = this.parentTagsList;
    },
    handleChange(value) {
      console.log(value);
      this.form.tags = value[value.length-1]
    },
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    onSubmit() {
      console.log(this.form.content);
      // console.log(marked(this.form.content))
      let data = {
        title: this.form.title,
        description: this.form.description,
        content: this.form.content,
        imgUrl: this.form.imgUrl,
        tags: this.form.tags,
        author: this.form.author,
        time: this.form.time,
        id: this.id
      };
      if (!data.title || !data.content) {
        this.$alert("二货，咱写点儿干货行不行呐！");
      }
      let res;
      if (this.id == "new") {
        res = this.$axios.post("/rest/blogs", data);
        this.$router.push("/blogs/list");
      } else {
        res = this.$axios.put(`/rest/blogs/${this.id}`, data);
        this.$router.push("/blogs/list");
      }
      console.log(res);
    },
    onCancel() {
      this.$router.push({
        path: "/blogs/list"
      });
    },
    handleAvatarSuccess(res) {
      console.log(res);
      this.form.imgUrl = res.url;
      console.log(this.form);
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formData = new FormData();
      formData.append("file", $file);
      this.$axios.post("/upload", formData).then(res => {
        console.log(res);
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.mavon.$img2Url(pos, res.data.url);
      });
    },
    $imgDel(pos, $file) {
      console.log(pos, $file);
    }
  }
};
</script>


<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
