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
import LoginForm from './components/LoginPage.vue';

export default {
  name: 'App',
  components: {
    LoginForm,
    Navigation
  },
  computed: {
    loadedPermissions() {
      return this.$store.state.loadedPermissions;
    }
  },
  created() {
    if (!this.loadedPermissions) {
      this.$store.dispatch('loadPermissions');
    }
    this.$store.dispatch('fetchUserProfile');
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
  height: 100%;
  width: 100%;
}

input {
  display: block;
  border: 1px solid #f2f8e4;
  margin-top: 10px;
  border-radius: 6px;
  padding: 10px;
  width: 90%;
}

input.error {
  border-color: red;
}

body {
    font-family: Arial, sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: white;
    height: 100%;
}
  
.container {
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: top;
  justify-content: center;
}

.page-h1 {
  font-size: 20pt;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  text-align: left;
  color: #383535;
  margin-top: 0;
} 
</style>
