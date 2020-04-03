<template>
  <div class="m-tags">
    <el-button size="samll" type="primary" class="m-ba-tags" @click="searchBlogs('',-1)">全部</el-button>
    <el-tag :class="{'active' : tag == p._id || tagIndex == i }" class="m-ba-tags mt-2 ml-2" v-for="(p,i) in parentTagsList.slice(0,10)" :key="i" :type="p.color" @click='searchBlogs(p._id,i)'>{{p.label}}</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      parentTagsList: [],
      color: ['','success','info','danger','warning'],
      tagIndex: -1,
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    async getTags() {
      let res = await this.$axios.get('/tags')
      let tagsList = res.data
      this.parentTagsList = res.data.filter(v => !v.parent)
      
      this.parentTagsList.forEach((el,e)=> {
        el.color = this.color[Math.floor(e%5)]
        el.children = tagsList.filter(c => c.parent == el._id)
      });
      console.log(this.parentTagsList)
    },
    searchBlogs(id,i) {
      this.tagIndex = i
      console.log(this.tagIndex, i)
      this.$emit('searchlist',id)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-tags{
  padding: 10px 0;
  .m-ba-tags{
    cursor: pointer;
    &:hover{
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
    }
  }
}
.active {
  background: var(--more)!important;
  border-color: var(--more)!important;
  color: #fff!important
}
</style>