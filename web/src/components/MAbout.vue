<template>
  <div class="m-about">
    <div :class="`header-img d-flex ai-start jc-center bgGrad-right border-more`">
      <div class="top-box text-center">
        <div class="mamba-box col-white">
          <i :class="`mx-2 iconfont ${$store.state.vuex_skin_obj.icon}`"></i>
          <strong>{{$store.state.vuex_skin_obj.behind}}</strong>
        </div>
        <slot></slot>
      </div>
      <router-link to="/">
      <el-button size="small" class="back-home">
        回到首页
      </el-button>
      </router-link>
    </div> 
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.header-img {
  height: 150px;
  width: 100%;
.back-home{
  position: absolute;
  top: 10px;
  left: 10px;
}
}
.top-box {
  z-index: 1000;
  animation: dropdown 1s linear 1;
  animation-fill-mode: both;
  .mamba-box {
    .iconfont {
      font-size: 40px !important;
    }
    .manba {
      padding: 7px 3px 0;
    }
  }
}
@keyframes dropdown {
  0% {
    -webkit-transform: translatey(0);
  }
  100% {
    -webkit-transform: translatey(50px);
  }
}
</style>