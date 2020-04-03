<template>
  <div id="app">    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch:{
      '$route':function(to,from){
　　　　　document.body.scrollTop = 0
        document.documentElement.scrollTop = 0 
      }
  },
  methods: {
  },
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
