<template>
  <h1 class="page-h1">Главная</h1>
  <div class="page-content">
    <div class="card">
      <h1>20</h1>
      <div class="badge"><span>777</span></div>
      <img src="@/assets/icons/docs.svg" alt="docs">
      <h4>Истекающие договоры</h4>
    </div>
    <div class="card">
      <h1>5</h1>
      <img src="@/assets/icons/tasks.svg" alt="task">
      <h4>Задачи</h4>
    </div>
    <div class="card">
      <h1>2</h1>
      <img src="@/assets/icons/comunication.svg" alt="task">
      <h4>Коммуникаций</h4>
    </div>
    <div class="big-card">
      <div class="tray-area">
        <span>Трей</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.page-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
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
  border-radius: 10px;
  align-items: center;
  gap: 5px;
  background-color: #f0f0f0;
  padding: 10px 10px 10px 40px;
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
  align-self: center  ;
}

.card .badge {
  grid-area: badge;
  background: rgb(91, 94, 91);
  height: 32px;
  text-align: center;
  border-radius: 20px;
  color: white;
}
 
.big-card {
  display: flex;
  flex-direction: column;
  color: white;
  cursor: pointer;
  border-radius: 16px;
  grid-column: span 3;
  background-color: #a0a0a0;
  padding: 8px;
  text-align: center;
  margin-top: 10px;
}

.big-card:hover {
  opacity: 90%;
}

.big-card h4 {
  justify-self: start;
  align-self: start;
}

.tray-area {
  background: white;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  color: #000;
  text-align: left;
}

.tray-area span {
  padding: 10px;
}

</style>