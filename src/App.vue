<template>
  <div class="container">
    <Navigation v-if="$route.name !== 'Login'" />
    <div class="page-container">
      <router-view />
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
  }

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: white;
    height: 100%;
  }
  
.container {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: top;
  justify-content: center;
}

.page-container {
  margin: 10px 30px;
  width: 100%;
  
  }

.page-content {
  display: block;
  width: 95%;
  height: 90%;
  border-radius: 20px;
  padding: 30px;
}

.page-h1 {
  font-size: 20pt;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  text-align: left;
  color: #383535;
}
</style>
