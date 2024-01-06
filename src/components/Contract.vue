<template>
    <div class="modal-backdrop">
      <div class="modal main-form">
        <header class="modal-header">
          <slot name="header" >
            {{ dynamicTitle }}
          </slot>
        </header>

        <section class="modal-body contract-body">
          <div class="contract-data">
            <slot name="body" >
              <input v-model="contract.number" placeholder="Номер договора" @input="resetAttemptedSave" :class="{ 'error': attemptedSave && !contract.number }" required/>
              <input v-model="contract.date" type="date" placeholder="Дата договора" @input="resetAttemptedSave" :class="{ 'error': attemptedSave && !contract.date }" required/>
              <Dropdown :options="CPs" :extOption="contract.counterparty_id" :attemptedSave="attemptedSave"  @option-selected="handleOptionSelected"/>
              <input v-model="contract.amount" placeholder="Сумма" required/>
              <Files @onFileUpload="onFileUpload" :files="contract.attaches"/>
            </slot>
          </div>
          <div class="preview">
          </div>
        </section>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn btn-prima"
            @click="saveContract"
          >
            Сохранить
          </button>

          <button
            type="button"
            class="btn btn-common"
            @click="closeForm"
          >
            Закрыть
          </button>
        </footer>
    </div>
  </div>
</template>

<script>
import Dropdown from "@/components/lib/Dropdown.vue"
import Files from "@/components/Files.vue"
import axios from '../axios';

export default {
  components: {
    Dropdown, Files
  },
  props: {
    contractID: {
      type: String,
      default: "",
    },
    dynamicTitle: "",
  },
  data() {
    return {
      contract: {
        number: "",
        date: "",
        counterparty_id: null,
        amount: "",
        attaches: null
      },
      CPs: [],
      selectedOption: null,
      attemptedSave: false
    };
  },
  watch: {
    contractID: {
      immediate: false,
      handler(newValue) {
        if (newValue !== "") {
          this.fetchContractData()
          this.fetchFiles()
        }
      },
    },

  },
  mounted() {
    this.fetchCounterparties()
  },
  methods: {
    resetAttemptedSave() {
      this.attemptedSave = false;
    },
    fillContract(contract) {
      this.contract.number = contract.contract_number
      this.contract.date = contract.contract_date
      this.contract.counterparty_id = contract.counterparty_id
      this.contract.amount = contract.contract_amount

    },
    async fetchFiles() {
      try {
        const apiUrl = `http://localhost:3000/files/${this.contractID}`;
        axios.get(apiUrl)
        .then(response => {
          this.contract.attaches = response.data
        })
        .catch(error => {
          console.error('Ошибка при выполнении запроса:', error);
        });

        } catch (error) {
          console.error('Ошибка при загрузке файлов договора', error);
        }
    },
    async fetchContractData() {
      try {
        const apiUrl = `http://localhost:3000/contracts/${this.contractID}`;
        axios.get(apiUrl)
        .then(response => {
          this.fillContract(response.data)
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });

          } catch (error) {
            console.error('Ошибка при загрузке данных', error);
        }
    },
    async fetchCounterparties() {
      try {
        const response = await axios.get('http://localhost:3000/CP');
        this.CPs = response.data;
      } catch (error) {
        console.error('Error fetching counterparties:', error);
      }
    },
    clearContract() {
      this.contract ={
        number: "",
        date: "",
        counterparty_id: null,
        amount: "",
        attach: null
      }
    },
    handleOptionSelected(option) {
      this.selectedOption = option;
      this.resetAttemptedSave()
    },
    saveContract() {
      this.attemptedSave = true;
      if (this.selectedOption) {
        this.contract.counterparty_id = this.selectedOption.id;
      }
      if (!this.contractID) {
        if (
          !this.contract.number ||
          !this.contract.date ||
          !this.contract.counterparty_id
        ) {
          return;
        }
      }
      this.$emit("save", this.contract);
    },

    closeForm() {
      this.$emit("close")
      this.clearContract()
    },
    onFileUpload(attach) {
      this.contract.attach = attach;
      this.attaches.push(attach)
    },
  }
};
</script>

<style scoped>
.contract-body {
  display: flex;
  justify-content: space-between;
}

.contract-data {
  width: 40%;
}

.preview {
  background-color: white;
  width: 50%;
}

.main-form {
  width: 90%;
  height: 90%;
}
input {
  display: block;
  border: 1px solid #f2f8e4;
  margin-top: 10px;
  border-radius: 6px;
  padding: 10px;
  width: 90%;
}

input.error {
  border-color: red;
}

</style>