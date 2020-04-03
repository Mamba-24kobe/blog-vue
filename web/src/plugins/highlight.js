import Vue from 'vue'
// import $ from 'jquery'

import hljs from 'highlight.js'
import 'highlight.js/styles/solarized-light.css' // 样式文件
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
   
    // let i = 1
    // const n = (m) => `<em class="line-label">${m > 9 ? m : '0' + m}</em>`
    // block.innerHTML = `<div class="line">${n(i)}${block.innerHTML.replace(/\n/g, function (word) {
    //   i += 1
    //   return `</div><div class="line">${n(i)}`
    // })}</div>`
  })
})