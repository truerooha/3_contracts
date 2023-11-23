<template>
  <h1 class="page-h1">Главная</h1>
  <div class="page-content main-page">
    <div class="green card">
      <div class="card-header">
        <div class="card-icon">
          <img class="icon" src="@/assets/icons/cont.svg" alt="">
          <h2>Договоры</h2>      
        </div>
      </div>
      <div class="attr1">
        <h1>20</h1>      
        <h4>истекает</h4>
      </div>
      <div class="attr2">
        <h1>134</h1>      
        <h4>всего</h4>
      </div>
    </div>
    <div class="white card">
      <h1>5</h1>
      <h4>Задачи</h4>
    </div>
    <div class="white card">
      <h1>2</h1>
      <h4>Уведомления</h4>
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
  grid-template-columns: 2fr 2fr;
  grid-template-areas: 
    'header header'
    'attr1 attr2';
  border-radius: 20px;
  align-items: left;
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

.card h2 {
  font-size: 18px;
}

.card:hover {
  opacity: 70%;
}

.card-icon {
  display: flex;
  align-items: center ;
  height: 36px;
  width: 36px;
  background: white;
  border-radius: 12px;
}

.card-header {
  grid-area: header;
}

.icon {
  width: 16px;
}
.attr1 {
  text-align: left;
  grid-area: attr1;
}

.attr2 {
  text-align: left;
  grid-area: attr2;
}

</style>