<template>
  <div class="navigation">
    <ul>
      <router-link class="nav-link" :class="{ active: $route.path === '/main' }" to="/main">
        <div class="icon-container">
          <i class="icon fa fa-home"></i>
        </div>
        Главная
      </router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/contracts' }" to="/contracts">
        <div class="icon-container">
          <i class="icon fa fa-file-contract"></i>
        </div>
        Договоры
      </router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/counterparties' }" to="/counterparties">
        <div class="icon-container">
          <i class="icon fa fa-users"></i>
        </div>
        Контрагенты
      </router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/search' }" to="/search">
        <div class="icon-container">
          <i class="icon fa fa-search"></i>
        </div>
        Поиск
      </router-link>
      <div class="spacer"></div>
      <router-link class="nav-link" :class="{ active: $route.path === '/settings' }" to="/settings">
        <div class="icon-container">
          <i class="icon fa fa-cog"></i>
        </div>
        Настройки
      </router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/support' }" to="/support">
        <div class="icon-container">
          <i class="icon fa fa-life-ring"></i>
        </div>
        Помощь
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style>
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 20px;
}

.navigation {
    width: 240px;
    height: 100vh;
    background-color: #ffffff;
    color: #0d0b0b;
    padding: 10px; 
}

.navigation ul {
    list-style-type: none;
    padding: 0;
}

.navigation .nav-link {
    display: flex;
    text-decoration: none;
    padding: 10px;
    margin-left: 10px;
    color: #9da1a4;
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
  background-color: rgb(52, 152, 219, 0.1);
  color: #349ad2;
  border-radius: 10px;
}

</style>