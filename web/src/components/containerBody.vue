<template>
  <div class="container-box" :class="isGrey ? 'body-container-grey' : ''">
    <div class="container" :class="isWhite ? 'container-white' : 'container-grey'" :style="{'background': `${bgColChild}`}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isGrey: Boolean,
    isWhite: Boolean,
    bgColChild: String,
  }
};
</script>

<style lang="scss" scoped>
.container-box{
  min-height: 500px;
}
.body-container-grey {
  font-size: 16px;
  width: 100%;
  background-color: #efefee;
  padding: 30px 0;
}
.container-white {
  background-color: #fff;
  padding: 30px 30px;
}
.container-grey{
  width: 90%;
  max-width: 1800px;
  margin: auto;   
}
@media screen and (max-width: 768px) {
  .body-container-grey {
    .container-white {
      width: 100%;
      // padding: 15px;
    }
  }
}
@media screen and (max-width: 375px) {
  .container-white {
    width: 100%;
    padding: 15px 15px 0;
    .article, .markdown-body{
      // color: red;
      p{
        text-indent: 2em!important;
        text-align: justify!important;
      }
    }
  }
  .container-grey{
    width: 100%;
    padding: 0 15px;
  }
}
</style>