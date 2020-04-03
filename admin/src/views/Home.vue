<template>
  <div class="home">
    <div class="d-flex jc-around flex-wrap">
      <div v-for="(o, index) in cardList" :key="index" @click="$router.push(o.path)">
          <div class="blogs-box d-flex ai-center jc-center" :style="{ 'background': o.color }">
            <i :class="o.icon"></i>
            <span>{{o.name}}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      cardList: [
        {
          name: "写博文",
          icon: "el-icon-edit",
          color: "#f56c6c",
          path: '/blogs/editor/new'
        },
        {
          name: "看留言",
          icon: "el-icon-message",
          color: "#4ebbaa",
          path: '/messages/list'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.home{
  min-height: 500px;
}
.blogs-box {
  width: 300px;
  margin-bottom: 20px;
  color: #fff;
  height: 200px;
  font-size: 30px;
  i {
    margin-right: 10px;
  }
}
</style>
