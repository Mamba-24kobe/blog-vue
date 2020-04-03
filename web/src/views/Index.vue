<template>
  <div class="index">
    <m-header :isScrolling="isScrolling"></m-header>
    <router-view :key="$route.path"></router-view>
    <m-footer></m-footer>
    <transition name="slide-show">
      <div class="ground-box" v-show="ballShow" @click="goTop">
        <div class="ball-box">
          <div class="ball-border"></div>
        </div>
      </div>
    </transition>
    <m-audio></m-audio>
  </div>
</template>

<script>
import MHeader from '../components/MHeader.vue'
import MFooter from '../components/MFooter.vue'
import MAudio from '../components/MAudio.vue'
import $ from "jquery";
export default {
  name: "Home",
  components: {
    MHeader,
    MFooter,
    MAudio
  },
  data() {
    return {
      isScrolling: false,
      ballShow: false
    };
  },
  created() {
    // window.document.documentElement.setAttribute('data-theme', 'green'); /* */
  },
  mounted() {
    this.ajustNavigation();
    window.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollListener);
  },

  methods: {
    scrollListener() {
      this.ajustNavigation();
    },
    ajustNavigation() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isScrolling = scrollTop > 50;
      this.ballShow = scrollTop >= 500;
    },
    goTop() {
      // document.body.scrollTop = 0
      // document.documentElement.scrollTop = 0 
      $("html,body").animate({ scrollTop: 0 }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
// 旋转篮球
.ground-box {
  cursor: pointer;
  position: fixed;
  right: 20px;
  bottom: 160px;
  animation: turn 2s linear infinite;
  // transition: all .28s ease-in 10s;
  .ball-box {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    background-color: orange;
    border: 2px solid #000;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    transform: rotate(20deg);
    &:before {
      content: "";
      position: absolute;
      top: -5px;
      left: -81px;
      width: 100px;
      height: 50px;
      border: 2px solid #000;
      border-radius: 50%;
    }
    &:after {
      content: "";
      position: absolute;
      top: -7.5px;
      left: 34px;
      width: 100px;
      height: 50px;
      border: 2px solid #000;
      border-radius: 50%;
      transform: rotate(-5deg);
    }
  }
  .ball-border {
    position: absolute;
    top: 20px;
    left: -25px;
    width: 100px;
    height: 50px;
    border: 2px solid #000;
    border-radius: 50%;
    &:before {
      content: "";
      position: absolute;
      top: -50px;
      left: -1px;
      width: 50px;
      height: 100px;
      border: 2px solid #000;
      border-radius: 50%;
    }
  }
}
@keyframes turn {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
// 篮球过渡动画
.slide-show-enter-active {
  transition: all 0.4s linear;
}
.slide-show-leave-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-show-enter,
.slide-show-leave-to {
  margin-right: -100px;
  opacity: 0;
}
</style>

