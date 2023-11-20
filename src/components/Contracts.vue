<template>
  <h1 class="page-h1">Договоры</h1>
  <div class="page-content contract-page">
      <div class="search-container">
        <div class="search-input">
          <img src="@/assets/icons/search.svg" class="icon-search" alt="Поиск">
          <input
            type="text"
            placeholder="Поиск..."
          />
        </div>
      <button @click="showContractForm" class="search-button btn btn-prima">+ Добавить</button>
      </div>

      <ContractForm
        v-show="isContractFormVisible"
        @close="hideContractForm"
        @save="saveContract"
      />

      <table class="common-table">
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
import ContractForm from "./NewContract.vue";
import { useToast } from "vue-toastification";

export default {
  name: 'Contracts',
  data() {
    return {
      contracts: [],
      isContractFormVisible: false
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
        return;
      }

      const index = this.contracts.indexOf(contract);
      if (index !== -1) {
        this.contracts.splice(index, 1);
        const contractId = contract.id;

        const requestData = { contract_id: contractId };
        
        const jsonData = JSON.stringify(requestData);

        axios.delete('http://localhost:8888/3_contracts/server/api.php', {
          data: jsonData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          console.log('Договор удален успешно.');
        })
        .catch((error) => {
          console.error('Ошибка при удалении договора:', error);
        });
      }
    },
    showContractForm() {
      this.isContractFormVisible = true;
    },
    hideContractForm() {
      this.isContractFormVisible = false;
    },
    saveContract(contractData) {
      const contractJSON = JSON.stringify(contractData);

      axios.post('http://localhost:8888/3_contracts/server/api.php', contractJSON, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const toast = useToast();
          toast.success("Договор сохранён", {
          timeout: 2000
      });
        })
        .catch((error) => {
          console.error('Ошибка при сохранении договора:', error);
        });
      this.hideContractForm();
      this.loadContracts();
    }
  },
  components: {
    ContractForm
  },
};
</script>

<style scoped>



.contract-page {
  display: block;
  height: 90%;
  border-radius: 10px;
  padding: 30px;
  justify-self: center;
  align-self: center;
}

.icon-search {
  width: 28px;
  margin-right: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: rgba(242, 237, 237, 0.5); /* Затемнение фона */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

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
  margin-left: auto;
}

.search-button:hover {
  background-color: #f6b26f;
}

.search-input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 28px;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
  border: 1px solid #f7f5f5;
}

input {
  border: none;
  outline: none;
  width: 100%;
  height: 20px;
}
</style>