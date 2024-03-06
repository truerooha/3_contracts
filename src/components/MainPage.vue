<template>
  <h1 class="page-h1">Главная</h1>
  <div class="page-content main-page">
    <Widget
        :cardClass="cardClass"
        :iconUrl="contsSVG" 
        title="Договоры"
        :attr1Value="expiredContracts"
        attr1Label="истекает"
        :attr2Value="totalContracts"
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
        iconColor = "#F7FAFC"
    />
    <Widget
        id="notificationsWidget"
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
import axios from '../axios';

export default {
  data() {
    return {
      contsSVG: require('@/assets/icons/cont.svg'),
      tasksSVG: require('@/assets/icons/tasks.svg'),
      notificationsSVG: require('@/assets/icons/notifications.svg'),
      dataLoaded: false,
      totalContracts: "0",
      expiredContracts: "0"
    }
  },
  methods: {
    goToContractsPage() {
      this.$router.push('/contracts');
    },
    async loadDataFromServer() {
      try {
        const response = await axios.get('http://localhost:3000/contracts/summary');
        const data = response.data
        this.expiredContracts= data.expired_contracts === null ? '0' : data.expired_contracts .toString()
        this.totalContracts= data.total_contracts === null ? '0' : data.total_contracts.toString()

        this.dataLoaded = true;
      } catch (error) {
        console.error('Ошибка при загрузке данных', error);
      }
    },
  },
  components: {
    Tray,
    Widget
  },
  computed: {
    cardClass() {
      return this.dataLoaded ? 'green' : 'skeleton';
    },
  },
  mounted() {
    this.loadDataFromServer();
  },
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

@media screen and (max-width: 1024px) {
  #notificationsWidget {
    display: none;
  }
}
</style>