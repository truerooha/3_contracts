<template>
  <div class="container">
    <Navigation v-if="$route.name !== 'Login'" />
    <div class="page-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Nav.vue';
import LoginForm from './components/Login.vue';

export default {
  name: 'App',
  components: {
    LoginForm,
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
