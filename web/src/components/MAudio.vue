<template>
  <div class="mAudio-box d-flex bgCol-more">
    <div class="play-box">
      <div
        class="rotate-img col-white d-flex ai-center jc-center"
        :class="{'anim-rotate' : isPlay}"
      >
        <i v-show="!isPlay" class="el-icon-video-play" @click="playMusic(true)"></i>
        <i v-show="isPlay" class="el-icon-video-pause" @click="playMusic(false)"></i>
      </div>
    </div>
    <!-- <transition name="slide-show"> -->
    <div v-show="isPlay" class="audio-box d-flex jc-center ai-center flex-1">
      <div class="process-box mr-2">
        <div class="time remember" :class="{'anim-rem' : isPlay}">
          <span>remember the name</span>
          <span style="display: inline-block; width: 180px"></span>
        </div>
        <div class="totalProcess" @click="updateProcess($event)">
          <div ref="playProcess" class="playProcess"></div>
        </div>
        <div class="d-flex jc-between">
          <span class="time">{{currentTimeStr}}</span>
          <span class="time">{{totalTimeStr}}</span>
        </div>
      </div>
      <audio
        id="music"
        ref="music"
        src="http://coco727.oss-cn-hongkong.aliyuncs.com/9dc2eeeabfa1faba5f865a43d3896288.mp3"
        loop
      ></audio>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlay: false,
      totalTimeStr: "3:50",
      currentTimeStr: "0:00",
      currentTime: 0
    };
  },
  mounted() {
    this.$refs.music.addEventListener("timeupdate", this.timeupdate);
  },
  beforeDestroy() {
    this.$refs.music.removeEventListener("timeupdate", this.timeupdate);
  },
  watch: {},
  methods: {
    playMusic(play) {
      // this.totalTimeStr = this.timeToStr(this.$refs.music.duration);
      // this.$refs.music.addEventListener('timeupdate',this.timeupdate)
      this.isPlay = !this.isPlay;
      if (play) {
        this.$refs.music.play();
      } else {
        this.$refs.music.pause();
      }
    },
    timeupdate() {
      this.currentTime = this.$refs.music.currentTime;
      console.log(this.currentTime);
      this.currentTimeStr = this.timeToStr(this.currentTime);
      if (this.currentTime > this.$refs.music.duration) {
        this.$refs.playProcess.style.width = "0px";
        this.currentTimeStr = "0:00";
      } else {
        this.$refs.playProcess.style.width =
          (this.currentTime / Math.floor(this.$refs.music.duration)) * 150 +
          "px";
        console.log(this.$refs.playProcess.style.width);
      }
    },
    // 点击进度
    updateProcess(e) {
      console.log(e.offsetX);
      this.$refs.music.currentTime =
        (e.offsetX / 150) * this.$refs.music.duration;
    },
    //将秒数转为00:00格式
    timeToStr(value) {
      let time = "";
      let h = Math.floor(value / 3600);
      let m = Math.floor((value % 3600) / 60);
      let s = Math.floor(value % 60);
      // h = h < 10 ? '0' + h : h + '';
      // m = m < 10 ? '0' + m : m + '';
      s = s < 10 ? "0" + s : s + "";
      if (h > 0) {
        time = h + ":" + m + ":" + s;
      } else {
        time = m + ":" + s;
      }
      return time;
    }
  }
};
</script>

<style lang="scss" scoped>
.mAudio-box {
  position: fixed;
  right: 0px;
  top: 100px;
  border-radius: 30px 0px 0px 30px;
  .play-box {
    cursor: pointer;
    padding: 5px;
    .rotate-img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      font-size: 24px;
      margin: 0 auto;
      background: url("../assets/audio.jpg") no-repeat center center/cover;
    }
    .anim-rotate {
      animation: animRotate 2s linear infinite;
    }
  }
}
.audio-box {
  color: #fff;
  font-size: 32px;
  .time {
    font-size: 12px;
  }
  .process-box {
    cursor: pointer;
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    .remember {
      height: 16px;
      width: 360.88px;
      overflow: hidden;
      white-space: nowrap;
    }
    .anim-rem {
      animation: rollLeft 10s linear infinite;
    }
  }
  .totalProcess {
    height: 3px;
    background: #fff;
    position: relative;
    border-radius: 2px;
    .playProcess {
      position: absolute;
      bottom: -2;
      left: 0;
      width: 0px;
      height: 3px;
      background: #ffb929;
      border-radius: 2px;
      &:after {
        position: absolute;
        top: -2px;
        right: 0px;
        content: ".";
        float: right;
        width: 7px;
        height: 7px;
        border-radius: 50px;
        background: #ffb929;
      }
    }
  }
}
@keyframes animRotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes rollLeft {
  from {
    -webkit-transform: translatex(150px);
  }
  to {
    -webkit-transform: translatex(-110px);
  }
}
</style>