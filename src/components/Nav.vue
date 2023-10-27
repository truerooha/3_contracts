<template>
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
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style>

</style>