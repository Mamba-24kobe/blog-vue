<template>
  <div class="page-box">
    <header :class="`header-box ${bgImg}`" :style="styleStr">
      <slot name="header"></slot>
    </header>
    <section class="tags-box">
       <slot name="tags"></slot>
    </section>
    <section class="section-box">
      <container-body :isGrey="isGrey" :isWhite="isWhite">
        <slot name="section"></slot>
      </container-body>
    </section>
  </div>
</template>

<script>
import containerBody from '../components/containerBody.vue'

export default {
  components: {
    containerBody,
  },
  props: {
    styleStr: {
      type: String, 
      default: ''
    },
    bgImg: String,
    isGrey: Boolean,
    isWhite: Boolean,
  }
};
</script>

<style lang="scss" scoped>
.tags-box{
  // padding: 10px 0;
  background-color: #fff;
}
</style>