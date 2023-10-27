<template>
  <div class="container">
    <Navigation />
    <div class="page-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Nav.vue';

export default {
  name: 'App',
  components: {
    Navigation
  }
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
