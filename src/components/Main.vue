<template>
  <h1 class="page-h1">Главная</h1>
  <div class="page-content main-page">
    <div class="green card">
      <h1>20</h1>      
      <h4>Истекающие договоры</h4>
    </div>
    <div class="white card">
      <h1>5</h1>
      <img src="@/assets/icons/tasks.svg" alt="task">
      <h4>Задачи</h4>
    </div>
    <div class="white card">
      <h1>2</h1>
      <img src="@/assets/icons/comunication.svg" alt="task">
      <h4>Коммуникаций</h4>
    </div>
    <Tray/>
  </div>
</template>

<script>
import Tray from './Tray.vue';

export default {
  components: {
    Tray
  } 
}
</script>

<style scoped>

.main-page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-template-rows: 1fr 4fr;
  justify-self: center;
  align-self: center;
}

.card {
  cursor: pointer;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-template-areas: 
    'h1 badge image'
    'h4 h4 image';
  border-radius: 20px;
  align-items: center;
  gap: 5px;
  padding: 10px 10px 10px 40px;
}

.green {
  background-color: #31C48D;
  background: url('@/assets/bg.svg') center/cover; 
  color: white
}

.white {
  background-color: white;
  color: #A0AEC0
}

.card:hover {
  opacity: 70%;
}

.card h4 {
  grid-area: h4;
  text-align: left;
}

.card h1 {
  grid-area: h1;
  text-align: left;
}

.card img {
  width: 64px;
  grid-area: image;
  justify-self: center;
  align-self: center;
  color: white;
}
</style>