<template>
  <div class="about fs-3xl">
    <m-about>
      <h3 class="m-0 m-2">我是{{$store.state.vuex_skin_obj.chinaName}}</h3>
      <p class="m-0 fs-2xl">89年老腊肉，web前端工程师</p>
    </m-about>
    <div class="bg-white">
      <div class="roll-left">
        <div class="carousel-border d-flex">
          <div v-for="(item,i) in carouselList" :key="i" class="carousel">
            <img :src="item.imgUrl" alt="Mamba 曼巴" height="200" width="300" class="roll-img" />
          </div>
        </div>
      </div>
      <!-- <div class="flex-1 px-5 py-4 video-box">
        <h2 class="mamba-text text-center">What Can I Say? MamBa Out!</h2>
        <video
          width="100%"
          controls
          autoplay
          loop
          src="http://coco727.oss-cn-hongkong.aliyuncs.com/2c485b722a105a0181868e289faaf9c6.mp4"
        ></video>
      </div>-->
      <code-demo></code-demo>
    </div>
  </div>
</template>

<script>
import MAbout from "../components/MAbout";
import codeDemo from "../components/codeDemo";

export default {
  components: {
    MAbout,
    codeDemo
  },
  data() {
    return {
      carouseIndex: 0,
      carouselList: [
        {
          imgUrl: require("../assets/me/school.jpg"),
          text:
            "200909～201306，就读于湖北工程学院-物理与电子信息工程学院-光信息科学与技术.（图为学校图书馆）"
        },
        {
          imgUrl: require("../assets/me/me1.jpg"),
          text:
            "201306毕业后，参军入伍，拿起钢枪，保卫国家，并于201712满服役期退伍."
        },
        {
          imgUrl: require("../assets/me/me2.jpg"),
          text:
            "201306毕业后，参军入伍，拿起钢枪，保卫国家，并于201712满服役期退伍."
        },
        {
          imgUrl: require("../assets/me/me3.jpg"),
          text:
            "201306毕业后，参军入伍，拿起钢枪，保卫国家，并于201712满服役期退伍."
        },
        {
          imgUrl: require("../assets/me/me4.jpg"),
          text: "退伍后，2018年初入坑前端，在家自学."
        },
        {
          imgUrl: require("../assets/me/me5.jpg"),
          text: "然后在武汉工作，从此一入前端深是海."
        },
        {
          imgUrl: require("../assets/me/school.jpg"),
          text:
            "200909～201306，就读于湖北工程学院-物理与电子信息工程学院-光信息科学与技术.（图为学校图书馆）"
        },
        {
          imgUrl: require("../assets/me/me1.jpg"),
          text:
            "201306毕业后，参军入伍，拿起钢枪，保卫国家，并于201712满服役期退伍."
        },
        {
          imgUrl: require("../assets/me/me2.jpg"),
          text:
            "201306毕业后，参军入伍，拿起钢枪，保卫国家，并于201712满服役期退伍."
        },
        {
          imgUrl: require("../assets/me/me3.jpg"),
          text:
            "201306毕业后，参军入伍，拿起钢枪，保卫国家，并于201712满服役期退伍."
        },
        {
          imgUrl: require("../assets/me/me4.jpg"),
          text: "退伍后，2018年初入坑前端，在家自学."
        },
        {
          imgUrl: require("../assets/me/me5.jpg"),
          text: "然后在武汉工作，从此一入前端深是海."
        }
      ]
    };
  },
  methods: {
    changeIndex(i) {
      console.log(i);
      this.carouseIndex = i;
    }
  }
};
</script>

<style lang="scss" scoped>
.roll-left {
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
}
.carousel-border {
  animation: rollLeft 20s linear infinite;
  .carousel {
    font-size: 0;
    .roll-img {
      border-left: 15px solid transparent;
      border-top: 30px solid transparent;
      border-bottom: 30px solid transparent;
      border-image: url("../assets/me/border.jpg") 56 11 round;
    }
  }
}
@keyframes rollLeft {
  from {
    -webkit-transform: translatex(0);
  }
  to {
    -webkit-transform: translatex(-1800px);
  }
}
</style>
