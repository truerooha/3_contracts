<template>
  <Dialog
      v-show="isDialogVisible"
      question="Вы уверены, что хотите удалить этот договор?"
      confirmText="Да"
      cancelText="Нет"
      buttonType = "error"
      @close="closeModal"
      @confirm="handleConfirm"
    />
  <h1 class="page-h1">Договоры</h1>
  <div class="page-content contract-page">
      <div class="search-container">
        <div class="input-wrapper">
          <search-input @add-filter="handleAddFilter"/>
        </div>
      <button @click="showContractForm" class="search-button btn btn-prima">+ Добавить</button>
      </div>

      <ContractForm
        v-show="isContractFormVisible"
        :contractID="selectedContract"
        :dynamicTitle="dynamicTitle"
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
            <th>Есть файлы</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contract in contracts" :key="contract.id" @click="openContract(contract)">
            <td>{{ contract.number }}</td>
            <td>{{ contract.date }}</td>
            <td>{{ contract.CPname }}</td>
            <td>{{ contract.amount }}</td>
            <td>
                <img v-if="contract.hasFiles === '1'" src="@/assets/icons/attach.svg" class="lil-icon img" alt="Есть файл">
            </td>
            <td>
              <span @click.stop="deleteContract(contract)">
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
import ContractForm from "./NewContract.vue";
import SearchInput from "./SearchInput.vue"
import Dialog from './Dialog.vue';
import { useToast } from "vue-toastification";

export default {
  name: 'Contracts',
  data() {
    return {
      contracts: [],
      isContractFormVisible: false,
      isDialogVisible: false,
      deletedContract: null,
      selectedContract: "",
      dynamicTitle: "",
      initialFilter: 'Контрагент',
    };
  },
  mounted() {
    this.loadContracts();
  },
  methods: {
    handleAddFilter() {

    },
    openContract(contract) {
      this.selectedContract = contract.id
      this.dynamicTitle = "Старый договор"
      this.isContractFormVisible = true;

    },
    loadContracts() {
      axios.get('http://localhost:8888/3_contracts/server/api.php')
        .then((response) => {
          this.contracts = response.data;
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных:', error);
        });
    },
    handleConfirm() {
        const requestData = { contract_id: this.deletedContract.id }
        const jsonData = JSON.stringify(requestData)
        axios.delete('http://localhost:8888/3_contracts/server/api.php', {
          data: jsonData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          this.contracts = this.contracts.filter(contract => contract.id !== this.deletedContract.id);
          this.deletedContract = null
          console.log('Договор удален успешно.');
            this.closeModal()

        })
        .catch((error) => {
          console.error('Ошибка при удалении договора:', error);
        });
      },
    deleteContract(contract) {
      this.deletedContract = contract
      this.isDialogVisible = true;
    },
    closeModal() {
      this.isDialogVisible = false;
      this.selectedContract = ""
    },
    showContractForm() {
      this.dynamicTitle = "Новый договор"
      this.isContractFormVisible = true; //TODO можно объединить с методом открытия
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
    ContractForm, Dialog, SearchInput
  },
};
</script>

<style scoped>
.input-wrapper {
  width: 60%;
}
.img {
  margin-left: 20px;
}
.contract-page {
  display: block;
  height: 90%;
  border-radius: 10px;
  justify-self: center;
  align-self: center;
}

.icon-search {
  width: 28px;
  margin-right: 10px;
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

.search-input {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  background-color: white;
  border-radius: 10px;
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