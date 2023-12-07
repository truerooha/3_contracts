<template>
    <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header" >
          {{ title }}
        </slot>
      </header>

      <section class="modal-body">
        <slot name="body" >
          <input v-model="contract.number" placeholder="Номер договора" required/>
          <input v-model="contract.date" type="date" placeholder="Дата договора" required/>
          <input v-model="contract.counterparty_id" placeholder="Контрагент" required/>
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
export default {
  props: ["visible"],
  data() {
    return {
      contract: {
        number: "",
        date: "",
        counterparty_id: 1,
        amount: "",
        attach: null
      },
      title: "Новый договор"
    };
  },
  methods: {
    saveContract() {
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