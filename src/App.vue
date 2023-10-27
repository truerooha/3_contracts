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
  margin-top: 20px;
}

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    height: 100vh;
  }
  
.container {
  display: flex;
  height: 100vh;
  align-items: flex-start;
  margin: 20px;
}

.page-container {
  margin-left: 20px;
  width: 100vh;
}

.page-h1 {
  font-size: 48pt;
  text-align: left;
}
</style>
