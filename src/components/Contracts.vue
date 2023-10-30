<template>
  <h1 class="page-h1">Договоры</h1>
  <div class="page-content">
      <div class="search-container">
        <div class="search-input">
          <img src="@/assets/icons/search.svg" class="icon-search" alt="Поиск">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Поиск..."
            @input="emitSearchQuery"
          />
        </div>
      <button class="search-button">+ Добавить</button>
      </div>
      <table class="contract-table">
        <thead>
          <tr>
            <th>Номер договора</th>
            <th>Дата</th>
            <th>Контрагент</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contract in contracts" :key="contract.id">
            <td>{{ contract.number }}</td>
            <td>{{ contract.date }}</td>
            <td>{{ contract.counterparty }}</td>
            <td>{{ contract.amount }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Contracts',
  data() {
    return {
      contracts: [
        { id: 1, number: '001', date: '2023-10-30', counterparty: 'Контрагент 1', amount: '1000 руб.' },
        { id: 2, number: '002', date: '2023-10-31', counterparty: 'Контрагент 2', amount: '1500 руб.' },
        { id: 3, number: '003', date: '2023-11-01', counterparty: 'Контрагент 3', amount: '2000 руб.' },
        // Добавьте другие данные о договорах
      ],
    };
  },
  mounted() {
    this.loadContracts();
  },
  methods: {
    loadContracts() {
      axios.get('http://localhost:8888/3_contracts/server/api.php')
        .then((response) => {
          this.contracts = response.data;
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных:', error);
        });
    }
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
}

.search-button {
  background-color: #f89c40;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: auto;
}

.search-button:hover {
  background-color: #f6b26f;
}

.search-input {
  display: flex;
  align-items: center;
  width: 180px;
  height: 32px;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
  border: 1px solid #f7f5f5;

}

input {
  border: none;
  outline: none;
  width: 100%;
}

.contract-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgb(255, 255, 255, 0.5);
}

.contract-table th, .contract-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #f7f5f5;; 
}

.contract-table th {
  background-color: #f7f5f5;
  color: #666952;  
}
</style>