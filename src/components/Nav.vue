<template>
  <div class="navigation">
    <ul>
      <router-link class="nav-link" :class="{ active: $route.path === '/main' }" to="/main">
        <div class="icon-container">
          <img src="@/assets/icons/home.svg" class="icon" alt="Главная">
        </div>
        Главная
      </router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/contracts' }" to="/contracts">
        <div class="icon-container">
          <img src="@/assets/icons/doc.svg" class="icon" alt="Договоры">
        </div>
        Договоры
      </router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/counterparties' }" to="/counterparties">
        <div class="icon-container">
        <img src="@/assets/icons/people.svg" class="icon" alt="Контрагенты">
        </div>
        Контрагенты
      </router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/search' }" to="/search">
        <div class="icon-container">
          <img src="@/assets/icons/search.svg" class="icon-search" alt="Поиск">
        </div>
        Поиск
      </router-link>
      <div class="spacer"></div>
      <router-link class="nav-link" :class="{ active: $route.path === '/settings' }" to="/settings">
        <div class="icon-container">
          <img src="@/assets/icons/settings.svg" class="icon" alt="Настройки">
        </div>
        Настройки
      </router-link>
      <router-link class="nav-link" :class="{ active: $route.path === '/support' }" to="/support">
        <div class="icon-container">
          <img src="@/assets/icons/support.svg" class="icon" alt="Помощь">
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
  width: 28px;
}

.icon {
  width: 24px;
  margin-right: 10px;
  color: currentColor;
}

.icon-search {
  width: 28px;
  margin-right: 10px;
  color: currentColor;
}

.navigation {
    width: 240px;
    height: 100vh;
    background-color: #F9FAF6;
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
    margin-top: 10px;
    font-size: 11pt;
    color: #666952;

}

.navigation .nav-link:hover {
  color: #d1d5d8;
}

.spacer {
    height: 40px; /* Регулируйте высоту, чтобы установить нужный отступ */
    width: 100%; /* Растянуть элемент на всю ширину */
    pointer-events: none;
}

.navigation .nav-link.active {

  color: #537C3C;
  border-radius: 10px;
}

</style>