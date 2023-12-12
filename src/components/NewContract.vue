<template>
    <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header" >
          {{ dynamicTitle }}
        </slot>
      </header>

      <section class="modal-body">
        <slot name="body" >
          <input v-model="contract.number" placeholder="Номер договора" required/>
          <input v-model="contract.date" type="date" placeholder="Дата договора" required/>
          <Dropdown :options="CPs" @option-selected="handleOptionSelected"/>
          <input v-model="contract.amount" placeholder="Сумма" required/>
          <input type="file" @change="handleFileUpload" />
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
import axios from 'axios';

export default {
  components: {
    Dropdown
  },
  props: {
    contractID: {
      type: String,
      default: "",
    },
    dynamicTitle: ""
  },
  data() {
    return {
      contract: {
        number: "",
        date: "",
        counterparty_id: 1,
        amount: "",
        attach: null
      },
      CPs: [
      ],
      selectedOption: null
    };
  },
  mounted() {
    if (this.contractID != "") {
      this.fetchContractData()
    } else {
      this.fetchCounterparties()
    }
    
  },
  methods: {
    async fetchContractData() {
      try {
        console.log("запрос")
      } catch (error) {
        console.error('Ошибка при загрузке данных', error);
      }
    },
    async fetchCounterparties() {
      try {
        const response = await axios.get('http://localhost:8888/3_contracts/server/loadCPs.php');
        this.CPs = response.data;
      } catch (error) {
        console.error('Error fetching counterparties:', error);
      }
    },
    handleOptionSelected(option) {
      this.selectedOption = option;
      console.log(option);
    },
    saveContract() {
      if (this.selectedOption) {
        this.contract.counterparty_id = this.selectedOption.id;
      }

      this.$emit("save", this.contract);
    },

    closeForm() {
      this.$emit("close");
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const fileData = reader.result;
          const attach = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: fileData, 
          };

          this.contract.attach = attach;

        }
        reader.readAsArrayBuffer(file);
      }
    }
  }
};
</script>

<style>

input {
  display: block;
  border: 1px solid #f2f8e4;
  margin-top: 10px;
  border-radius: 6px;
  padding: 10px;
  width: 90%;
}

</style>