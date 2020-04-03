<template>
  <div>
    <footer class="footer-box bgGrad-left">
      <div class="footer-info py-4">
        <div class="d-flex container fs-2xl jc-between flex-wrap px-4">
          <div class="d-flex flex-column jc-between">
            <div>
              <router-link to="/abouts" class="pr-3">关于我</router-link>
              <router-link to="/blogs/5e6241637a6658290597f2d6" class="pr-3">关于博客</router-link>
              <!-- <router-link to="/aboutBlogs" class="pr-3">博客demo</router-link> -->
            </div>
            <div class="icon my-2">
              <el-tooltip class="item" effect="dark" content="后期补上" placement="top-start">
                <i class="iconfont icon-github mr-4" title></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="没有，就为了好看" placement="top-start">
                <i class="iconfont icon-zhihu mr-4" title="没有，就为了好看"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="没有，就为了吸引你点" placement="top-start">
                <i class="iconfont icon-weibo" title="没有，就为了吸引你点"></i>
              </el-tooltip>
            </div>
          </div>
          <div class="footer-mamba col-white">
            <p class="m-0">{{vuex_skin_obj.footerUp}}</p>
            <p class="m-0 text-indent">{{vuex_skin_obj.footerDown}}</p>
            <div class="mamba-box d-flex ai-end jc-end">
              <i class="pb-2">——</i>
              <i :class="`iconfont mx-2 ${vuex_skin_obj.icon}`"></i>
              <strong>{{vuex_skin_obj.behind}}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-ICP text-center py-4 fs-2xl">
        <a
          href="http://www.beian.miit.gov.cn/"
          target="_blank"
        >@2020 Design and Code by Mamba. 鄂ICP备20002324号</a>
      </div>
    </footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['vuex_skin_obj'])
  },
};
</script>

<style lang='scss' scoped>
.footer-box {
  .footer-info {
    .mamba-box {
      .iconfont {
        font-size: 24px;
      }
      .manba {
        padding: 7px 3px 0;
      }
    }
  }
  .footer-ICP {
    border-top: 1px solid #fff;
  }
  a {
    color: #000;
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
}
.icon {
  display: inline;
  .iconfont {
    cursor: pointer;
    font-size: 20px;
    border: 1px solid #000;
    color: #000;
    padding: 5px;
    border-radius: 50%;
  }
  .icon-github {
    &:hover {
      background: linear-gradient(to right, #4ebbaa, #6bc30d);
      border-color: #6bc30d;
      color: #fff;
    }
  }
  .icon-zhihu {
    &:hover {
      background: linear-gradient(to right, #0550bf, #0283ff);
      border-color: #0283ff;
      color: #fff;
    }
  }
  .icon-weibo {
    &:hover {
      background: linear-gradient(to right, #e6162e, #fe5835);
      border-color: #fe5835;
      color: #fff;
    }
  }
}
@media screen and (max-width: 375px) {
  .footer-mamba {
    .text-indent {
      text-indent: 0em;
    }
  }
}
</style>