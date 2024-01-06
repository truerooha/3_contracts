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
          <search-input/>
        </div>
      <button @click="showContractForm" class="search-button btn btn-prima">+ Новый</button>
      </div>

      <NewContract
        v-show="isNewContractVisible"
        @close="hideNewContract"
        @save="saveNewContract"
      />

      <SavedContract
        v-show="isSavedContractVisible"
        :contractID="selectedContract"
        :dynamicTitle="dynamicTitle"
        @close="hideContract"
        @save="saveContract"
      />
      <div class="filters">
        <badge v-for="(filter, index) in filters" :key="index" :text="filter.label" :filterId="index"/>
      </div>

      <table class="common-table contracts-table">
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
              <img v-if="contract.hasFiles === 1" src="@/assets/icons/attach.svg" class="lil-icon img" alt="Есть файл">
            </td>
            <td>
              <span @click.stop="deleteContract(contract)">
                <img src="@/assets/icons/trash.svg" class="lil-icon" alt="Удалить">
              </span>
            </td>
          </tr>
          <tr v-if="isEmptyContracts">
            <td colspan = "6" class="no-contracts" >нет договоров</td>
          </tr>
        </tbody>
      
      </table>

  </div>
</template>

<script>
import axios from '../axios';
import NewContract from "./NewContract.vue";
import SavedContract from "./Contract.vue";
import SearchInput from "./SearchInput.vue"
import Dialog from './lib/Dialog.vue';
import Badge from './lib/Badge.vue'
import { useToast } from "vue-toastification";

export default {
  name: 'Contracts',
  data() {
    return {
      isNewContractVisible: false,
      isSavedContractVisible: false,
      isDialogVisible: false,
      deletedContract: null,
      selectedContract: "",
      dynamicTitle: "",
    };
  },
  mounted() {
    this.$store.dispatch('fetchContracts');
  },
  computed: {
    filters() {
      return this.$store.getters.getFilters;
    },
    contracts() {
      return this.$store.getters.getContracts;
    },
    isEmptyContracts() {
        return this.$store.state.contracts.length === 0;
    }
  },
  methods: {
    openContract(contract) {
      this.selectedContract = contract.id.toString()
      this.dynamicTitle = "Старый договор"
      this.isSavedContractVisible = true;
    },
    handleConfirm() {
        axios.delete(`http://localhost:3000/contracts/remove/${this.deletedContract.id}`)
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
      this.isNewContractVisible = true;
    },
    hideNewContract() {
      this.isNewContractVisible = false;
    },
    hideContract() {
      this.isSavedContractVisible = false;
    },

    saveContract(contractData) {
      this.hideContract();
    },

    saveNewContract(contractData) {
      const contractJSON = JSON.stringify(contractData);
      axios.post('http://localhost:3000/contracts/new', contractJSON, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const toast = useToast();
          toast.success("Договор сохранён", {
          timeout: 2000
          });
        this.$store.dispatch('fetchContracts');

        })
        .catch((error) => {
          console.error('Ошибка при сохранении договора:', error);
        });
      this.hideNewContract();
    }
  },
  components: {
    NewContract, SavedContract, Dialog, SearchInput, Badge
  },
};
</script>

<style scoped>
.no-contracts {
  text-align: center;
  width: 100%;
  padding: 10px;
}
.filters {
  display: flex;
  margin-bottom: 30px;
  height: 32px;
}
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
  margin-bottom: 10px;
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

.contracts-table {
  width: 100%;
}
</style>