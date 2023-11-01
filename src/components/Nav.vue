<template>
  <div class="navigation theme-color">
    <div class="comp-badge">
      <img src="@/assets/icons/user.jpeg" class="ava" alt="Главная">
      <div class="comp-details">
        <h3>Panadey</h3>
        <p>contracts</p>
      </div>
    </div>
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

<style scoped>

.comp-badge {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 20px;
  cursor: pointer;
}

.ava {
  width: 36px;
  margin-right: 10px;
  border-radius: 50%;
}

.comp-details {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 5px;
  border-radius: 10px;
}

.comp-details h3 {
  padding: 0;
  margin: 0;
}

.comp-details p {
  padding: 0;
  margin: 0;
  color: #666952;
}

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
    padding: 10px;
}

.navigation ul {
    margin-top: 40px;
    list-style-type: none;
    padding: 0;
}

.navigation .nav-link {
    display: flex;
    text-decoration: none;
    align-items: center;
    padding: 10px;
    margin-left: 16px;
    margin-top: 10px;
    font-size: 11pt;
    color: #666952;

}

.navigation .nav-link:hover {
  color: #d1d5d8;
}

.spacer {
    height: 40px;
    width: 100%;
    pointer-events: none;
}

.navigation .nav-link.active {
  font-weight: 900;
  color: #537C3C;
  border-radius: 10px;
}

</style>