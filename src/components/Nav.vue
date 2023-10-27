<template>
  <div class="navigation">
    <ul>
      <router-link class="nav-link" :class="{ active: $route.path === '/main' }" to="/main">Главная</router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/contracts' }" to="/contracts">Договоры</router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/counterparties' }" to="/counterparties">Контрагенты</router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/search' }" to="/search">Поиск</router-link>
      <div class="spacer"></div>
      <router-link class="nav-link" :class="{ active: $route.path === '/settings' }" to="/settings">Настройки</router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/support' }" to="/support">Помощь</router-link>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style>

.navigation {
    width: 200px;
    height: 100%;
    background-color: #ffffff;
    color: #0d0b0b;
    border-radius: 5px;

}

.navigation ul {
    list-style-type: none;
    padding: 0;
}

.navigation .nav-link {
    display: block;
    text-decoration: none;
    padding: 10px;
    text-align: left;
    margin-left: 10px;
    color: #383535;
}

.navigation .nav-link:hover {
  color: #3498db;
}

.spacer {
    height: 40px; /* Регулируйте высоту, чтобы установить нужный отступ */
    width: 100%; /* Растянуть элемент на всю ширину */
    pointer-events: none;
}

.navigation .nav-link.active {
  background-color: #3498db;
  color: #dbe8ef;
}

</style>