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
    height: 100%;
  }
  
.container {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: top;
  justify-content: center;
  margin: 20px;
}

.page-container {
  margin-left: 30px;
  width: 100%;
}

.page-h1 {
  font-size: 24pt;
  text-align: left;
}
</style>
