<template>
  <div>
    <el-dropdown class="mr-3" @command="changeVersion">
      <span class="el-dropdown-link col-white">
        <span class="text-hide">版本：</span>{{versionName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(s, i) in versionList" :key="i" :command="s.cookie" :disabled="s.disabled">{{s.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown @command="changeTheme">
      <span class="el-dropdown-link col-white">
        <span class="text-hide">皮肤：</span>{{vuex_skin_obj.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(s, i) in skinList" :key="i" :command="s.more">{{s.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <el-color-picker
    v-model="theme"
    :predefine="['#8600ff','#ca0a15','#005085','#1964b7','#007a31','#5391ca']"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    title="换肤"
    @change="changeTheme"
    ></el-color-picker>-->
  </div>
</template>
 
<script>
const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#ffb929"; // default color
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      versionName: 'vue.js',
      chalk: "", // content of theme-chalk css
      theme: "#ffb929",
      skinList: [
        {
          name: "Mamba",
          chinaName: "曼巴",
          more: "#8600FF",
          root: {
            "--less": "#ffb929",
            "--more": "#8600ff",
            "--hover": "#6303b8",
            "--text": "#fff",
            "--link": "#000",
            "--active": "#ffb929",
            "--img1": `url(${require("../../public/img/mamba1.jpg")})`,
            "--img2": `url(${require("../../public/img/mamba2.jpg")})`,
            "--img3": `url(${require("../../public/img/mamba3.jpg")})`,
            "--img4": `url(${require("../../public/img/mamba4.jpg")})`
          },
          first: "M",
          icon: "icon-M",
          behind: "amba",
          headerUp: "曼巴 out ?",
          headerDown: "未完待续。。。",
          footerUp: "Mamba is not out",
          footerDown: "I'm here all the time!"
        },
        {
          name: "King",
          chinaName: "狼王",
          more: "#254381",
          root: {
            "--less": "#00795a",
            "--more": "#254381",
            "--hover": "#003355",
            "--text": "#fff",
            "--link": "#000",
            "--active": "#00795a",
            "--img1": `url(${require("../../public/img/king1.jpg")})`,
            "--img2": `url(${require("../../public/img/king2.jpg")})`,
            "--img3": `url(${require("../../public/img/king3.jpg")})`,
            "--img4": `url(${require("../../public/img/king4.jpg")})`,
          },
          first: "K",
          icon: "icon-K",
          behind: "ing",
          headerUp: "KG",
          headerDown: "狼王是也。。。",
          footerUp: "Kevin Garnet",
          footerDown: "I'm the king of wolves!"
        },
        // {
        //   name: "James",
        //   chinaName: "詹皇",
        //   more: "#aa0528",
        //   root: {
        //     "--less": "#dcbe64",
        //     "--more": "#aa0528",
        //     "--hover": "#93030b",
        //     "--text": "#fff",
        //     "--link": "#000",
        //     "--active": "#dcbe64",
        //     "--img1": `url(${require("../../public/img/james1.jpg")})`,
        //     "--img2": `url(${require("../../public/img/james2.jpg")})`,
        //     "--img3": `url(${require("../../public/img/james3.jpg")})`,
        //     "--img4": `url(${require("../../public/img/james4.jpg")})`,
        //   },
        //   first: "J",
        //   icon: "icon-J",
        //   behind: "ames",
        //   headerUp: "LeBron James",
        //   headerDown: "战斧式劈扣。。。",
        //   footerUp: "LeBron James",
        //   footerDown: "I'm little Emperor!"
        // },
        // {
        //   name: "Truth",
        //   chinaName: "真理",
        //   more: "#007A31",
        //   root: {
        //     "--less": "#dcbe64",
        //     "--more": "#007a31",
        //     "--hover": "#025523",
        //     "--text": "#fff",
        //     "--link": "#000",
        //     "--active": "#dcbe64",
        //     "--img1": `url(${require("../../public/img/truth1.jpg")})`,
        //     "--img2": `url(${require("../../public/img/truth2.jpg")})`,
        //     "--img3": `url(${require("../../public/img/truth3.jpg")})`,
        //     "--img4": `url(${require("../../public/img/truth4.jpg")})`,
        //   },
        //   first: "T",
        //   icon: "icon-T",
        //   behind: "ruth",
        //   headerUp: "Paul Pierce",
        //   headerDown: "吾即真理。。。",
        //   footerUp: "Paul Pierce",
        //   footerDown: "I'm the truth!"
        // },
        // {
        //   name: "Answer",
        //   chinaName: "答案",
        //   more: "#5391CA",
        //   root: {
        //     "--less": "#fbb826",
        //     "--more": "#5391ca",
        //     "--hover": "#2c6eac",
        //     "--text": "#fff",
        //     "--link": "#000",
        //     "--active": "#fbb826",
        //     "--img1": `url(${require("../../public/img/answer1.jpg")})`,
        //     "--img2": `url(${require("../../public/img/answer2.jpg")})`,
        //     "--img3": `url(${require("../../public/img/answer3.jpg")})`,
        //     "--img4": `url(${require("../../public/img/answer4.jpg")})`,
        //   },
        //   first: "A",
        //   icon: "icon-A",
        //   behind: "nswer",
        //   headerUp: "Allen Iverson",
        //   headerDown: "永远的答案",
        //   footerUp: "Allen Iverson",
        //   footerDown: "I'm the answer forever!"
        // },
        // {
        //   name: "Rose",
        //   chinaName: "玫瑰",
        //   more: "#CA0A15",
        //   root: {
        //     "--less": "#3c3c3c",
        //     "--more": "#ca0a15",
        //     "--hover": "#93030b",
        //     "--text": "#fff",
        //     "--link": "#3c3c3c",
        //     "--active": "#3c3c3c",
        //     "--img1": `url(${require("../../public/img/rose1.jpg")})`,
        //     "--img2": `url(${require("../../public/img/rose2.jpg")})`,
        //     "--img3": `url(${require("../../public/img/rose3.jpg")})`,
        //     "--img4": `url(${require("../../public/img/rose4.jpg")})`,
        //   },
        //   first: "R",
        //   icon: "icon-R",
        //   behind: "ose",
        //   headerUp: "风城玫瑰",
        //   headerDown: "永不凋零。。。",
        //   footerUp: "The rose never fades",
        //   footerDown: "I'm the youngest MVP!"
        // },
        // {
        //   name: "Curry",
        //   chinaName: "库里",
        //   more: "#246ec4",
        //   root: {
        //     "--less": "#fbbf16",
        //     "--more": "#246ec4",
        //     "--hover": "#0e519f",
        //     "--text": "#fff",
        //     "--link": "#000",
        //     "--active": "#fbbf16",
        //     "--img1": `url(${require("../../public/img/curry1.jpg")})`,
        //     "--img2": `url(${require("../../public/img/curry2.jpg")})`,
        //     "--img3": `url(${require("../../public/img/curry3.jpg")})`,
        //     "--img4": `url(${require("../../public/img/curry4.jpg")})`,
        //   },
        //   first: "C",
        //   icon: "icon-C",
        //   behind: "urry",
        //   headerUp: "Three Points",
        //   headerDown: "日天。。。",
        //   footerUp: "Stephen Curry",
        //   footerDown: "I'm super god shooter!"
        // },
      ],
      versionList: [
        {
          name: 'nuxt.js',
          cookie: 'nuxt',
          disabled: false
        },
        {
          name: 'vue.js',
          cookie: 'vue',
          disabled: true
        },
      ],
    };
  },
  watch: {
    async theme(val, oldVal) {
      console.log(val);     
      let theme = this.skinList.find(v => v.more == String(val));
      console.log(theme);
      if (theme) {
        for (let k in theme.root) {
          document.body.style.setProperty(k, theme.root[k]);
        }
        this.vuex_set_skin_obj(theme);
      }
      // this.updateTheme(val, oldVal);
    }
  },
  computed: {
    ...mapState(["vuex_skin_obj"])
  },
  methods: {
    ...mapMutations(["vuex_set_skin_obj"]),
    changeTheme(c) {
      this.theme = c;
    },
    changeVersion(v) {
      document.cookie = `version=${v};path=/;`
      window.location = 'https://www.coco727.com'
    },
    updateTheme(val, oldVal) {
      if (typeof val !== "string") return;
      const head = document.getElementsByTagName("head")[0];
      const themeCluster = this.getThemeCluster(val.replace("#", ""));
      const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
      this.$message({
        message: "更换主题中...",
        type: "success",
        center: true,
        duration: 2000,
        offset: 70
      });
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace("#", "")
          );
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );

          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            head.appendChild(styleTag);
          }
          styleTag.innerText = newStyle;
        };
      };

      const chalkHandler = getHandler("chalk", "chalk-style");
      console.log(this.chalk);
      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        this.getCSSString(url, chalkHandler, "chalk");
      } else {
        chalkHandler();
      }

      const link = [].slice.call(
        document.getElementsByTagName("head")[0].getElementsByTagName("link")
      );
      for (let i = link.length - 3; i < link.length; i++) {
        const style = link[i];
        this.getCSSString(style.href, innerText => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace("#", "")
          );
          const newStyle = this.updateStyle(
            innerText,
            originalCluster,
            themeCluster
          );
          let styleTag = document.getElementById(i);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = i;
            styleTag.innerText = newStyle;
            head.appendChild(styleTag);
          }
        });
      }

      const styles = [].slice
        .call(document.querySelectorAll("style"))
        .filter(style => {
          const text = style.innerText;
          return (
            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
          );
        });
      styles.forEach(style => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });
      // this.$emit("change", val);
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },
    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (variable) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
          }
          callback(xhr.responseText);
        }
      };
      xhr.open("GET", url);
      xhr.send();
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    }
  }
};
</script>
 
<style>
/* .theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
} */
.el-color-picker {
  height: 30px !important;
}
.theme-picker .el-color-picker__trigger {
  height: 30px !important;
  width: 30px !important;
  padding: 2px;
}

/* .theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
} */
@media screen and (max-width: 400px) {
  .text-hide{
    display: none;
  }
}
</style>