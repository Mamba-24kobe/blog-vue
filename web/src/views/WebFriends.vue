<template>
  <div>
    <page-box
      :isGrey="true"
      bgImg="headBgImg-3"
      :styleStr="`width: 100%; height: 300px; background-position: top center; background-size: cover`"
    >
      <div slot="section">
        <div class="text-center pb-5">
          <el-button type="primary" @click="dialogVisible = true">+ 申请加入</el-button>
        </div>
        <div class="d-flex jc-around flex-wrap">
          <el-card
            class="box-card"
            shadow="hover"
            @click="open(item)"
            v-for="(item, i) in cardList"
            :key="i"
          >
            <div slot="header" class="title" @click="open(item)">
              <img :src="item.avatarImg" alt="Mamba 曼巴logo" height="40" />
              <span class="pl-3 fs-3xl">{{item.nickName}}</span>
            </div>
            <p class="pl-3 m-0 fs-2xl">{{item.description}}</p>
          </el-card>
        </div>
      </div>
    </page-box>
    <el-dialog title="欢迎加入" :visible.sync="dialogVisible" width="320px" center>
      <form-input @toRequest="submit" :isUpload="true"></form-input>
    </el-dialog>
  </div>
</template>

<script>
import formInput from '../components/formInput'

export default {
  components: {
    formInput,
  },
  data() {
    return {
      dialogVisible: false,
      cardList: [],
    };
  },
  created() {
    this.getCardsList();
  },
  methods: {
    async getCardsList() {
      let res = await this.$axios.get("/friends");
      this.cardList = res.data.filter(v => v.isPass);
    },
    async submit(form) {
      let res = await this.$axios.post("/friends", form);
      this.dialogVisible = false;
      this.$message({
        message: "提交成功，博主审核中。。。",
        type: "success",
        duration: 5000
      });
      this.getCardsList();
      console.log(res);
    },
    open(item) {
      window.open(item.url);
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  cursor: pointer;
  width: 25%;
  // margin-right: 20px;
  margin-bottom: 20px;
  .title {
  }
}
@media screen and (max-width: 1024px) {
  .box-card {
    width: 32%;
  }
}
@media screen and (max-width: 768px) {
  .box-card {
    width: 48%;
  }
}
@media screen and (max-width: 500px) {
  .box-card {
    width: 100%;
  }
}
</style>