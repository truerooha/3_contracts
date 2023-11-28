<template>
  <h1 class="page-h1">Главная</h1>
  <div class="page-content main-page">
    <div class="green card" @click="goToContractsPage">
        <div class="card-header">
          <div class="card-icon">
            <img src="@/assets/icons/cont.svg" alt="">
          </div>
          <h2>Договоры</h2>     

        </div>
      <div class="attributes">
        <div class="attr attr1">
          <h1>20</h1>      
          <h4>истекает</h4>
        </div>
        <div class="attr attr2">
          <h1>134</h1>      
          <h4>всего</h4>
        </div>
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
  methods: {
    goToContractsPage() {
      this.$router.push('/contracts');
    },
  },
  components: {
    Tray
  } 
}
</script>

<style scoped>
.attributes {
  display: flex;
  margin-top: auto;
  justify-content: left;
}

.attributes h1, h4 {
  margin: 10px 10px 10px 0px;
}

.attr1 {
  text-align: left;
}

.attr2 {
  align-self: center;
  width: 200px;
}

.main-page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-template-rows: 1fr 4fr;
  justify-self: center;
  align-self: center;
}

.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 20px;
  align-items: left;
  gap: 5px;
  padding: 20px;
  box-shadow: 0px 10px 16px -4px #71809614;
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

.card-header h2 {
  font-size: 18px;
  margin-left: 20px;
}

.card:hover {
  opacity: 70%;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: auto;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  background: white;
  border-radius: 12px;
}

.card-icon img{
  width: 24px;
}

</style>