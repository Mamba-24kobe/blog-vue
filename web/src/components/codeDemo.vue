<template>
  <div class="fs-3xl py-5 px-4">
    <div class="text-center own-intro">
    <p><strong class="fs-9xl">{{$store.state.vuex_skin_obj.chinaName}} </strong>89年老腊肉！毕业于湖北工程学院的物理与电子信息专业，</p>
    <p>毕业后去当兵，退伍回来后，四肢发达，头脑简单，大学所修内功心法尽失，</p>
    <p>江湖传闻有一神功：Web前端，不需自宫，也能成功，遂改行……，一入前端深似海</p>
    <p>一个人静静坐在电脑面前写代码的感觉，那是什么感觉？那是武林高手闭关修炼的感觉。</p>
    <p>相信编程是一门武术，喜欢用代码来表达心灵鸡汤。</p>
    <img src="../assets/me/lizi.jpg" alt="Mamba out" height="200">
    </div>
    <div class="article markdown-body codeHtml" v-html="codeHtml" v-highlight></div>
    study : <el-tooltip class="item" effect="dark" :content="isStudy ? 'study = true' : 'study = false'" placement="right">
      <el-switch
        v-model="isStudy"
        @change="changeOwn(isStudy,days)"
        active-color="#13ce66"
        inactive-color="#ff4949"
        title="点点我"
      ></el-switch>
    </el-tooltip>
    <div class="d-flex ai-center">
      <span class="pr-2"> days :</span><el-slider class="flex-1" el-slider v-model="days" @input="changeOwn(isStudy,days)" :min='1' :max='365'></el-slider>
    </div>
    <div class="d-flex ai-center">
      <span class="pr-2">own : </span>
      <NumberGrow class="flex-1" v-if="load" :value="number" :isStudy="isStudy"></NumberGrow>
    </div>
    <div class="text-center biaoqing">
      <p class="my-4">纳尼？</p>
      <img src="../assets/me/nani.jpg" alt="Mamba out" height="200">  
      <p class="my-4">我也不知道想表达什么，我先干了这碗鸡汤啊，你们随意！</p>
      <img src="../assets/me/jitang.jpg" alt="Mamba out" height="200">
      <p class="my-4">不用往下滑了，这页就敷衍到这吧！</p>
    </div>

  </div>
</template>

<script>
import marked from "marked";
import { addLineAndCopy } from "../plugins/lineAndCopy";
import NumberGrow from "./NumberGrow";

export default {
  components: {
    NumberGrow
  },
  data() {
    return {
      content: "```javascript↵const changeOwn = (study = false，days = 365) => {↵    let everyDay = 1↵    let own = 0↵    everyDay = study ? everyDay + 0.01 : everyDay - 0.01↵    own = Math.pow(everyDay, days)↵    return own↵}↵```↵",

      codeHtml: "",
      isStudy: false,
      number: 0,
      days: 365,
      load: true
    };
  },
  created() {},
  mounted() {
    this.getCodeHtml();
    this.changeOwn(this.isStudy,this.days)
  },
  methods: {
    async getCodeHtml() {
      let res = await this.$axios.get("/blogs/5e5fdb5afa3c62134a3e685a");
      this.codeHtml = marked(res.data.content);
      this.$nextTick(() => {
        addLineAndCopy();
      });
    },
    changeOwn(study = false, days = 365) {
      console.log(study, days)
      let everyDay = 1;
      let own = 0;
      everyDay = study ? everyDay + 0.01 : everyDay - 0.01;
      own = Math.pow(everyDay, days);
      console.log(own);
      this.number = own;
      this.load = false;
      this.$nextTick(() => {
        this.load = true;
      });
    }
  }
};
</script>

<style>
.codeHtml {
  overflow: hidden;
}
.el-slider__runway{
  width: 200px!important;
}
.own-intro{
animation: transLeft 1s linear 1;
}
.biaoqing{
animation: transRight 1s linear 1;
}
@keyframes transLeft {
  0% {
    -webkit-transform: translatex(50%);
  }
  100% {
    -webkit-transform: translatex(0);
  }
}
@keyframes transRight {
  0% {
    -webkit-transform: translatex(-50%);
  }
  100% {
    -webkit-transform: translatex(0);
  }
}
</style>