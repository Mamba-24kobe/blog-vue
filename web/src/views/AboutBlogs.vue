<template>
  <div class="about-blogs fs-3xl col-">
    <m-about>
      <h2 class="m-0 mb-1">关于博客</h2>
      <p class="m-0 fs-3xl">flex、响应式布局</p>
    </m-about>
    <container-body :isGrey="true" :isWhite="true" bgColChild='#fff8ea'>
      <article class="article-box">
        <h2>一、博客由来</h2>
        <p>2020年注定是不平凡的一年，首先因为新冠状病毒疫情，被困在家里，再次假期一次次延长，从初7(1月31号)上班推到2月20号，心中私私窃喜后，又是那么的无聊，然后“猪化”到2月20号晚，收到公司通知假期再次延长到3月10号，又多了20天，大概是从这一刻开始，我就有了想法：得做点之前想做一直没时间做的事情了。</p>
        <h2>二、博客结构</h2>
        <div class="d-flex jc-center">
          <img src="../assets/bushu.png" alt="Mamba 曼巴" class="my-4" height="250px"/>
        </div>
        <p>如上面的部署结构图，其中有三个模块为代码部分：</p>
        <ol class="h4-ol">
          <li>serve模块 是node.js写的API服务</li>
          <li>web模块 是所有博客网站页面</li>
          <li>admin模块 是用于自己管理博客网站数据的后台管理页面</li>
        </ol>
        <p>
          我没有把admin后台管理模块放在web模块子目录下，而是作为一个独立的分模块，使用不同的二级域名来访问。
          这样虽然增加了一部分工作量以及重复代码（因为admin模块和web模块共用一套node服务开发的API，也有部分组件是一样的）但是结构会更清晰和独立，后期也便于扩展（万一哪天，自己给自己加需求呢？）。
          不得不说对于熟悉 JavaScript 的开发人员来说使用 node.js, 进行后端逻辑开发会简单方便很多。数据库没有使用较为常用的 MySQL，而是"大胆"采用了非关系型数据库 MongoDB（其实真实原因是：用那啥调调SQL语句我是真的不会）。
        </p>
        <h3>(一)、前端相关相关框架、库、插件、工具</h3>
        <h4>(1)、javaScript部分</h4>
        <ol class="h4-ol">
          <li>
            <a href="https://cn.vuejs.org/" target="_blank">
              <strong> vue.js </strong>是一套用于构建用户界面的渐进式JavaScript框架
            </a>
          </li>
          <li>
            <a href="https://cli.vuejs.org/zh/" target="_blank">
              <strong> vue-cli 3.0 </strong>是一个基于 Vue.js 进行快速开发的完整系统
            </a>
          </li>
          <li>
            <a href="https://router.vuejs.org/zh/" target="_blank">
              <strong> vue-router </strong>是 Vue.js 官方的路由管理器。让构建单页面应用变得易如反掌
            </a>
          </li>
          <li>
            <a href="http://www.axios-js.com/" target="_blank">
              <strong> axios </strong>是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中
            </a>
          </li>
          <li>
            <a href="https://vuex.vuejs.org/zh/" target="_blank">
              <strong> vuex </strong>是一个专为 Vue.js 应用程序开发的状态管理模式
            </a>
          </li>
          <li>
            <a href="https://element.eleme.cn/#/zh-CN" target="_blank">
              <strong> element-ui </strong>是一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/mavon-editor" target="_blank">
              <strong> mavon-editor </strong>是一款基于vue的markdown编辑器,比较适合博客系统
            </a>
          </li>
          <li>
            <a href="https://marked.js.org/" target="_blank">
              <strong> marked </strong>是一个用JavaScript写的功能齐全的Markdown解析器和编译器
            </a>
          </li>
          <li>
            <a href="https://www.jquery123.com/" target="_blank">
              <strong> jquery </strong>是一个JavaScript库, 极大地简化了编程
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/vue-stick" target="_blank">
              <strong> vue-stick </strong>是一款基于 vue.js 的瀑布流组件
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/v-emoji-picker" target="_blank">
              <strong> v-emoji-picker </strong>是一款基于 vue.js 的emoji表情插件
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/dayjs" target="_blank">
              <strong> dayjs </strong>是一个轻量的处理时间和日期的 JavaScript 库
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/prerender-spa-plugin" target="_blank">
              <strong> prerender-spa-plugin </strong>是一个能简单解决预渲染的插件
            </a>
          </li>
          <!-- <li><a href="https://cli.vuejs.org/zh/" target="_blank"></a></li>
            <li><a href="https://cli.vuejs.org/zh/" target="_blank"></a></li>
          <li><a href="https://cli.vuejs.org/zh/" target="_blank"></a></li>-->
        </ol>
        <h4>(2)、css部分</h4>
        <ol class="h4-ol">
          <li>
            <a href="https://www.sass.hk/" target="_blank">
              <strong> sass </strong> 世界上最成熟、最稳定、最强大的专业级CSS扩展语言！(搜了这么多官网介绍，感觉sass官网这个介绍真牛逼！)
            </a>
          </li>
          <li>
            <a href="https://www.iconfont.cn/" target="_blank">
              <strong> iconfont </strong> 国内功能很强大且图标内容很丰富的矢量图标库
            </a>
          </li>
          <li>
            <a href="https://highlightjs.org/" target="_blank">
              <strong> highlight.js </strong> 是一款让你的代码在html页面中高亮的一个插件
            </a>
          </li>
        </ol>
        <h3>(二)、后端相关框架、库、插件、工具</h3>
        <ol class="h3-ol">
          <li>
            <a href="https://nodejs.org/zh-cn/" target="_blank">
              <strong> node.js </strong>是一个基于 Chrome V8 引擎的 JavaScript 运行环境
            </a>
          </li>
          <li>
            <a href="https://www.expressjs.com.cn/" target="_blank">
              <strong> express </strong>是基于 Node.js 平台，快速、开放、极简的 Web 应用开发框架
            </a>
          </li>
          <li>
            <a href="http://www.mongoosejs.net/" target="_blank">
              <strong> mongoose.js </strong>是在node.js异步环境下对mongodb进行便捷操作的对象模型工具
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/cors" target="_blank">
              <strong> cors </strong>是一个 node.js 中间件，启用具有各种选项，比如解决跨域问题
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/ali-oss" target="_blank">
              <strong> ali-oss </strong>对接阿里云对象存储OSS，用来上传和管理文件
            </a>
          </li>
          <!-- <li>
            <a href="https://www.npmjs.com/package/multer" target="_blank">
              <strong> multer </strong>是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据,它主要用于上传文件
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/multer-aliyun-oss" target="_blank">
              <strong> multer-aliyun-oss </strong>可以用来上传文件到阿里云oss
            </a>
          </li> -->
          <li>
            <a href="https://www.npmjs.com/package/bcrypt" target="_blank">
              <strong> bcrypt </strong> 一个用来加密的库，我用来加密了后台管理登陆密码
            </a>
          </li>
        </ol>
        <h3>(三)、数据库</h3>
        <ol class="h3-ol">
          <li>
            <a href="https://www.mongodb.com/" target="_blank">
              <strong> MongoDB </strong>是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的
            </a>
          </li>
        </ol>
        <h3>(四)、服务器</h3>
        <ol class="h3-ol">
          <li>
            <a href="http://nginx.org/" target="_blank">
              <strong> Nginx </strong>是一个高性能的HTTP和反向代理web服务器
            </a>
          </li>
        </ol>
        <h3>(五)、文件存储</h3>
        <ol class="h3-ol">
          <li>
            <a href="https://www.aliyun.com/product/oss" target="_blank">
              <strong> 阿里云对象存储OSS </strong>使用RESTful API 可以在互联网任何位置存储和访问，容量和处理能力弹性扩展，多种存储类型供选择全面优化存储成本
            </a>
          </li>
        </ol>
        <h2>三、总结</h2>
        <p>总的来说，自己是很高兴的，通过这次完整的独立的个人项目。从需求分析和UI页面设计(其实这两步是在脑子里设计的，没有形成文档和图稿)、画前端页面和调后端API获取数据（以前只做这两部分）、后端操作数据库、通过Nginx把打包好的代码部署到线上环境，让大家可以通过电脑或手机访问。</p>
        <p>然后发现一个问题： 大部分时间都花在前端(大概三分之二的时间)，特别是css部分</p>
        <p>原因当然是UI页面设计很重要，准确来说我是边画页面边设计，灵感一来就改这改那。就拿网站logo和页面主题颜色来说，最开始站名是叫coco(看域名就知道了，不然域名就是mamba了，不知道后期能改域名不)，主打颜色绿色，背景图为青山绿水风景图。</p>
        <p>后来刷抖音又看到科比的追悼会，湖人的紫金战袍给了我灵感，所以就是现在大家看到的网站，Mamba，紫色和黄色，科比图片。然后就不说其它地方为了好看，一个个的试颜色(比如博文里代码高亮用什么主题颜色好呢)或布局样式(横竖、宽高、margin padding多少，字体大小多少，还要做移动端响应式布局)</p>
        <p>
          <a class="min-line">所以一个公司一个项目定需求定文案定设计是多么重要，直接影响项目效率。</a> ,<strong>(假装此处已屏蔽领导，看不到...)</strong>
        </p>
        <p>自身存在问题：</p>
        <ol class="h3-ol">
          <li>框架用久了，原生js的基础都不怎么会了，准确说是薄弱</li>
          <li>动画不熟练，css3不熟练和canvas在项目中未使用</li>
          <li>太依赖前人的现成的库、插件、工具来实现</li>
        </ol>
        <h2>四、下步计划（To Do List）</h2>
        <ol class="h3-ol">
          <li>图片比例失调，需要更精细的剪裁，目前临时占个坑</li>
          <li>性能优化，图片需要压缩处理，预加载处理。</li>
					<li>给博文页面加上tag标签搜索功能</li>
					<li>浏览器兼容问题，移动端适配。只用了自己电脑的谷歌chrome浏览器开发和手机适配效果，其他种种都没试，不过不建议移动端使用，电脑登陆效果更佳。</li>
          <li>解决vue的seo问题及刷新渲染页面抖动问题。先暂时做vue预渲染，不排除以后会做vue服务端渲染或nuxt.js服务端渲染</li>
          <li>整理代码，拆分出组件。让结构更清晰，代码量更少。</li>
        </ol>
        <h2>五、最后</h2>
        <p>欢迎大家可以给我留言，提需求提Bug。</p>
      </article>
    </container-body>
  </div>
</template>

<script>
import MAbout from "../components/MAbout";
export default {
  components: {
    MAbout
  }
};
</script>

<style lang="scss" scoped>
.article-box {
  padding-bottom: 20px;
  .min-line {
    text-decoration-line: line-through;
  }
  p {
    line-height: 1.4;
    text-indent: 2em;
  }
  h3 {
    padding-left: 20px;
  }
  .h3-ol {
    padding-left: 60px;
  }
  h4 {
    padding-left: 40px;
  }
  .h4-ol {
    padding-left: 80px;
  }
}
.container-white {
  background-color: #fff8ea !important;
}
@media screen and (max-width: 500px) {
	img{
		width: 100%;
    height: 150px;
	}
}
</style>