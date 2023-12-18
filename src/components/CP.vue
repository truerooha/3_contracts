<template>
  <div class="top">
    <h1 class="page-h1">Контрагенты</h1>
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
      ]
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    openCPForm() {

    },
    fetchData() {
      axios.get('http://localhost:3000/api/hello')
        .then(response => {
          this.message = response.data.message;
          console.log(this.message)
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
</style>