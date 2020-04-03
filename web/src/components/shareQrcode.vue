<template>
  <div class="">
    <div class="icon-box">
      <div class="icon jc-center ai-center">
      <div :tabindex="0" class="dashang-box d-flex" @blur="showCode = false">
        <i
          class="iconfont dashang mx-5"
          :class="{'activeCode':showCode}"
          title="请我喝杯茶啊"
          @click="showCode = !showCode; showCanvas = false"
        >赏</i>
        <div v-show="showCode" class="rotate-box" :class="{'active-rotate': isRotate}">
          <div class="wxCode">
            <span class="btn" @click="isRotate =!isRotate">支</span>
            <h3 class="mt-0 fs-3xl">微信</h3>
            <img src="../assets/dashang.jpg" alt="打赏Mamba" width="150px" />
            <div class="m-0 fs-2xl">赏我的人，长的真好看</div>
          </div>
          <div class="zfbCode">
            <span class="btn" @click="isRotate =!isRotate">微</span>
            <h3 class="mt-0 fs-3xl">支付宝</h3>
            <img src="../assets/zfb.png" alt="打赏Mamba" width="150px" />
            <div class="m-0 fs-2xl">赏我的人，长的真好看</div>
          </div>
        </div>
      </div>
      <div :tabindex="0" class="QRcode-box d-flex" @blur="showCanvas = false">
        <i
          :class="{'activeCode':showCanvas}"
          class="iconfont icon-weixin mx-5"
          title="微信分享"
          @click="showCanvas = !showCanvas; showCode = false"
        ></i>
        <canvas id="canvas" v-show="showCanvas"></canvas>
      </div>
      <el-tooltip class="item" effect="dark" content="后期补上" placement="top-start">
        <i class="iconfont icon-weibo mx-5" title="后期补上"></i>
      </el-tooltip>
      </div>

    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      showCode: false,
      showZfbCode: false,
      showCanvas: false,
      isRotate: false,
    };
  },
  created() {},
  mounted() {
    console.log(window);
    var canvas = document.getElementById("canvas");
    QRCode.toCanvas(canvas, window.location.href, function(error) {
      if (error) console.error(error);
      console.log("success!");
    });
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.icon-box {
  padding: 20px 0;
  color: #fff;
  text-align: center;
  position: relative;
  .icon{
    display:inline-flex;
    position: relative;
    background-color: #fff;
    z-index: 1;
  }
  &:before,&:after{
    content: "";
    height: 1px;
    width: 30%;
    position: absolute;
    top: 50%;
    background-color: #d4d4d5;
  }
  &:before{
    left: 0;
  }
  &:after{
    right: 0
  }
  .iconfont {
    z-index: 2;
    cursor: pointer;
    height: 45px;
    width: 45px;
    font-size: 22px;
    padding: 10px;
    border-radius: 50%;
    opacity: .8;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
  .activeCode {
    opacity: 1;
    transform: scale(1.2);
  }
  .dashang {
    background: linear-gradient(135deg, #ffe985 10%, #fa742b);
    // background: linear-gradient(to right, #4ebbaa, #6bc30d);
  }
  .icon-weixin {
    background: linear-gradient(135deg, #81fbb8 10%, #28c76f);
  }
  .icon-weibo {
    background: linear-gradient(135deg, #feb692 10%, #ea5455);
  }
  .dashang-box {
    position: relative;
  }
  .rotate-box {
    position: absolute;
    left: -45px;
    bottom: 60px;
    width: 200px;
    height: 250px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
    perspective: 1000;
    transition: all 1s linear;
    transform-style: preserve-3d;
  }
  .active-rotate{
    transform: rotateY(180deg);
  }
  .wxCode,
  .zfbCode {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px 0;
    width: 200px;
    height: 250px;
    backface-visibility: hidden;
    text-align: center;
    background: #fff;
    color: #333;
    .btn {
      cursor: pointer;
      font-size: 18px;
      color: #fff;
      position: absolute;
      top: 2px;
      right: 2px;
    }
  }
  .wxCode {
    z-index: 2;
    &:before {
      content: "";
      border-top: 20px solid rgba(2, 160, 231, 1);
      border-right: 20px solid rgba(2, 160, 231, 1);
      border-bottom: 20px solid transparent;
      border-left: 20px solid transparent;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .zfbCode {
    transform: rotateY(-180deg);
    &:before {
      content: "";
      border-top: 20px solid #2ea143;
      border-right: 20px solid #2ea143;
      border-bottom: 20px solid transparent;
      border-left: 20px solid transparent;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
.QRcode-box {
  position: relative;
  #canvas {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
    position: absolute;
    left: -31px;
    bottom: 60px;
  }
}
@media screen and (max-width: 768px) {
  .mx-5{
    margin: 0 20px;
  }
}
</style>