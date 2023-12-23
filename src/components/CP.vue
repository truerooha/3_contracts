<template>
  <div class="top">
    <h1 class="page-h1">Контрагенты</h1>
    <transition name="slide">
      <div v-if="showForm" class="form">
          <h2>Моя форма</h2>
      </div>
    </transition>
    <button @click="openCPForm" class="addCP btn btn-prima">+ Создать контрагента</button>
  </div>
  <div class="page-content" id="cp-page">
    <table class="cp-table common-table">
      <thead>
        <tr>
          <th>Наименование</th>
          <th>ИНН</th>
          <th>E-mail</th>
          <th>Телефон</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="CP in CPs" :key="CP.id">
          <td>{{ CP.CPname }}</td>
          <td>{{ CP.INN }}</td>
          <td>{{ CP.email }}</td>
          <td>{{ CP.phone }}</td>
          <td>
          <span @click="deleteContract(CP)">
            <img src="@/assets/icons/trash.svg" class="lil-icon" alt="Удалить">
          </span>
        </td>
        </tr>
      </tbody>
      </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Counterparties',
  data() {
    return {
      CPs: [
        { id: 1, CPname: 'Контрагент 1', INN: '1234567890', email: 'cp1@example.com', phone: '123-456-7890' },
        { id: 2, CPname: 'Контрагент 2', INN: '0987654321', email: 'cp2@example.com', phone: '987-654-3210' },
      ],
      showForm: false
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    openCPForm() {
      this.showForm = !this.showForm;
    },
    fetchData() {
      axios.get('http://localhost:3000/CP')
        .then(response => {
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  }
}
</script>

<style>

.addCP {
  margin-left: auto;
}

.top {
  display: flex;
  width: 100%;
}

#cp-page {
  display: flex;
  border-radius: 10px;
  padding: 30px;
  align-items: flex-start;
  width: 95%;
}

.cp-table {
  justify-self: center;
}

.slide-enter-active, .slide-leave-active {
    transition: transform 0.5s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active в <2.1.8 */ {
    transform: translateX(0);
}
.slide-enter-to, .slide-leave /* .slide-enter-active в <2.1.8 */ {
    transform: translateX(100%);
}

/* Стили для формы */
.form {
    background-color: #ffffff;
    padding: 20px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40%;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
}
</style>