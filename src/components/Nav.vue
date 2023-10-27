<template>
  <div class="navigation">
    <ul>
      <router-link class="nav-link" to="/main">Главное</router-link>
      <router-link class="nav-link" to="/contracts">Договоры</router-link>
      <router-link class="nav-link" to="/counterparties">Контрагенты</router-link>
      <router-link class="nav-link" to="/search">Поиск</router-link>
      <div class="spacer"></div>
      <router-link class="nav-link" to="/settings">Настройки</router-link>
      <router-link class="nav-link" to="/support">Помощь</router-link>
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
    color: #383535;
    text-decoration: none;
    padding: 10px;
    text-align: left;
    margin-left: 10px;
}

.navigation .nav-link:hover {
  color: #ff6600;
}

.spacer {
    height: 40px; /* Регулируйте высоту, чтобы установить нужный отступ */
    width: 100%; /* Растянуть элемент на всю ширину */
    pointer-events: none;
}

</style>