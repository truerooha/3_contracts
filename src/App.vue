<template>
  <div class="container">
    <div class="navigation">
      <ul>
        <router-link to="/main">Главное</router-link>
        <router-link to="/contracts">Договоры</router-link>
        <router-link to="/counterparties">Контрагенты</router-link>
        <router-link to="/search">Поиск</router-link>
        <div class="spacer"></div>
        <router-link to="/settings">Настройки</router-link>
        <router-link to="/support">Помощь</router-link>
      </ul>
    </div>

    <div class="page-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: { }
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
