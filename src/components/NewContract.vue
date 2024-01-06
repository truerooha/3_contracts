<template>
    <div class="modal-backdrop">
      <div class="modal main-form">
        <header class="modal-header">
          <slot name="header" >
            Новый договор
          </slot>
        </header>

        <section class="modal-body">
          <slot name="body" >
            <input v-model="contract.number" placeholder="Номер договора" @input="resetAttemptedSave" :class="{ 'error': attemptedSave && !contract.number }" required/>
            <input v-model="contract.date" type="date" placeholder="Дата договора" @input="resetAttemptedSave" :class="{ 'error': attemptedSave && !contract.date }" required/>
            <Dropdown :options="CPs" :extOption="contract.counterparty_id" :attemptedSave="attemptedSave"  @option-selected="handleOptionSelected"/>
            <input v-model="contract.amount" placeholder="Сумма" required/>
            <Files @onFileUpload="onFileUpload" :files="contract.attaches"/>
          </slot>
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
            @click="closeForm">
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
  data() {
    return {
      contract: {
        number: "",
        date: "",
        counterparty_id: null,
        amount: "",
        attaches: [],
      },
      CPs: [],
      selectedOption: null,
      attemptedSave: false
    };
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
      if (
        !this.contract.number ||
        !this.contract.date ||
        !this.contract.counterparty_id
      ) {
        return;
      }
      this.$emit("save", this.contract);
    },

    closeForm() {
      this.$emit("close")
      this.clearContract()
    },
    onFileUpload(attach) {
      this.contract.attaches.push(attach)
    },

  }
};
</script>

<style scoped>
.main-form {
  width: 320px;
}

</style>