<template>
  <h1 class="page-h1">Договоры</h1>
  <div class="page-content">
      <div class="search-container">
        <div class="search-input">
          <img src="@/assets/icons/search.svg" class="icon-search" alt="Поиск">
          <input
            type="text"
            placeholder="Поиск..."
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contract in contracts" :key="contract.id">
            <td>{{ contract.number }}</td>
            <td>{{ contract.date }}</td>
            <td>{{ contract.CPname }}</td>
            <td>{{ contract.amount }}</td>
            <td>
            <span @click="deleteContract(contract)">
              <img src="@/assets/icons/trash.svg" class="icon-trash" alt="Удалить">
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
  name: 'Contracts',
  data() {
    return {
      contracts: [],
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
    },

    deleteContract(contract) {
      const confirmed = confirm('Вы уверены, что хотите удалить этот договор?');
      if (!confirmed) {
        return; // Если пользователь отменил удаление, ничего не делаем.
      }

      const index = this.contracts.indexOf(contract);
      if (index !== -1) {
        this.contracts.splice(index, 1);
        const contractId = contract.id;

        // Создаем объект для отправки
        const requestData = { contract_id: contractId };
        
        // Преобразуем объект в строку JSON
        const jsonData = JSON.stringify(requestData);

        axios.delete('http://localhost:8888/3_contracts/server/api.php', {
          data: jsonData, // Указываем данные для DELETE запроса
          headers: {
            'Content-Type': 'application/json', // Устанавливаем заголовок для JSON
          },
        })
        .then(() => {
          console.log('Договор удален успешно.');
        })
        .catch((error) => {
          console.error('Ошибка при удалении договора:', error);
        });
      }
    }
  }
};
</script>

<style scoped>
.icon-trash {
  width: 20px;
  cursor: pointer;
}


.icon-trash:hover {
  color: #f7f5f5;
}
 
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