<template>
  <div class="navigation">
    <div class="lists">
      <div class="comp-badge">
        <img src="@/assets/icons/user.jpeg" class="ava" alt="Главная">
        <div class="comp-details">
          <h3>Panadey</h3>
          <p>contracts</p>
        </div>
      </div>
      <ul class="top-links">
        <router-link class="nav-link" :class="{ active: $route.path === '/main' }" to="/main">
          <div class="icon-container">
            <img src="@/assets/icons/home.svg" class="icon" alt="Главная">
          </div>
          Главная
        </router-link>
        <router-link class="nav-link" :class="{ active: $route.path === '/contracts' }" to="/contracts">
          <div class="icon-container">
            <img src="@/assets/icons/conts.svg" class="icon" alt="Договоры">
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
      
      </ul>
      <ul class="bottom-links">
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
        <div class="spacer"></div>
        <router-link @click="handleLogout" class="nav-link" :class="{ active: $route.path === '/login' }" to="/login">
          <div class="icon-container">
            <img src="@/assets/icons/logout.svg" class="icon" alt="Выход">
          </div>
          Выход
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
    name: 'Navigation',
    methods: {
      handleLogout() {
        Cookies.remove("authorized")
      }
    }
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

.lists {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
}

.lists ul {
    list-style-type: none;
    padding: 0;
}

.bottom-links {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: auto;
  margin-bottom: 40px; 
}

.bottom-links .nav-link {
    margin-top: 10px;
}

.spacer {
  border-bottom: 1px solid #EDF2F7;
  height: 10px;
  margin-left: 20px;
}

.lists .nav-link {
    display: flex;
    text-decoration: none;
    align-items: center;
    padding: 10px;
    margin-left: 16px;
    margin-top: 10px;
    font-size: 11pt;
    color: #666952;

}

.lists .nav-link:hover {
  color: #718096;
  background: #F3FAF7;
  border-radius: 12px;

}

.lists .nav-link.active {
  font-weight: 900;
  color: #31C48D;
  border-radius: 12px;
  background: #F3FAF7;
}

</style>