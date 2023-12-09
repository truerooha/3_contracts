<template>
  <h1 class="page-h1">Главная</h1>
  <div class="page-content main-page">
    <Widget
        cardClass="green"
        :iconUrl="contsSVG" 
        title="Договоры"
        attr1Value="20"
        attr1Label="истекает"
        attr2Value="134"
        attr2Label="всего"
        @click="goToContractsPage"
    />
    <Widget
        cardClass="white"
        :iconUrl="tasksSVG" 
        title="Задачи"
        attr1Value="5"
        attr1Label="срочные"
        attr2Value="27"
        attr2Label="всего"
        @click="goToContractsPage"
    />
    <Widget
        cardClass="gray"
        :iconUrl="notificationsSVG" 
        title="Уведомления"
        attr1Value="5"
        attr1Label="срочные"
        attr2Value="27"
        attr2Label="всего"
        @click="goToContractsPage"
    />
    <Tray/>
  </div>
</template>

<script>
import Tray from './Tray.vue';
import Widget from './Widget.vue';

export default {
  data() {
    return {
      contsSVG: require('@/assets/icons/cont.svg'),
      tasksSVG: require('@/assets/icons/tasks.svg'),
      notificationsSVG: require('@/assets/icons/notifications.svg'),
    }
  },
  methods: {
    goToContractsPage() {
      this.$router.push('/contracts');
    },
  },
  components: {
    Tray,
    Widget
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



</style>