<template>
  <div class="top">
    <h1 class="page-h1">Контрагенты</h1>
    <button @click="openCPForm" :class="{'addCP': true, 'glowing': !CPnotEmpty }" class="btn btn-prima">+ Новый</button>
  </div>
  <div class="page-content" id="cp-page">
    <dummy v-if="!CPnotEmpty"
      :imageUrl="CPDummySVG"
      :title="'Пока пусто :('"
    ></dummy>
    <div class="table-container">
        <table v-if="CPnotEmpty" class="cp-table common-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Наименование</th>
              <th>ИНН</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(CP, index) in CPs" :key="CP.id" @click="selectCP(CP)">
              <td>{{ index + 1}}</td>
              <td>{{ CP.name }}</td>
              <td>{{ CP.inn }}</td>
              <td>
              <span @click="deleteCP(CP)">
                <img src="@/assets/icons/trash.svg" class="lil-icon" alt="Удалить">
              </span>
            </td>
            </tr>
          </tbody>
        </table>
    </div>
    <div v-if="CPnotEmpty" class="cp-form">
      <h2 v-if="selectedCP">{{ selectedCP.name }}</h2>
      <p v-if="selectedCP">ИНН: {{ selectedCP.inn }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Dummy from './lib/Dummy.vue'

export default {
  name: 'Counterparties',
  components: {Dummy},
  data() {
    return {
      CPs: [
      ],
      selectedCP: null,
      CPDummySVG: require('@/assets/pics/confused.svg'),
    };
  },
  computed: {
    CPnotEmpty() {
      return this.CPs.length > 0;
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    selectCP(CP) {
      this.selectedCP = CP;
    },
    deleteCP() {

    },
    fetchData() {
      axios.get('http://localhost:3000/CP')
        .then(response => {
          this.CPs = response.data;
          if (this.CPs.length > 0) {
            this.selectedCP = this.CPs[0];
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  }
}
</script>

<style>
@keyframes glowing {
    0% { background-color: #31C48D; box-shadow: 0 0 5px #31C48D; }
    50% { background-color: #6ceeab; box-shadow: 0 0 20px rgb(49, 196, 141, 0.5); }
    100% { background-color: #31C48D; box-shadow: 0 0 5px #31C48D; }
}
.addCP {
  margin-left: auto;
}

.glowing {
  animation: glowing 3000ms infinite;
}
.top {
  display: flex;
  width: 100%;
}

.table-container {
  width: 50%;
}

#cp-page {
  display: flex;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  justify-content: space-between;
}

.cp-table {
  align-self: start;
}

.cp-form {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-right: 10px;
  width: 40%;
  height: 85%;
  box-shadow: 0 0 20px rgb(49, 196, 141, 0.1);
}
</style>