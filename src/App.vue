<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/17100512.jpg" height="200" width="250">
    <!-- <Home msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from './components/Home.vue'


// Vue.use(VueAxios, axios)

export default {
  name: 'App',
  components: {
    // Home
  },
  
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
