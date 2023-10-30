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
            <input v-model="contract.number" placeholder="Номер договора" />
            <input v-model="contract.date" placeholder="Дата договора" />
            <input v-model="contract.counterparty" placeholder="Контрагент" />
            <input v-model="contract.amount" placeholder="Сумма" />
          </slot>
        </section>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn btn-prima"
            @click="saveForm"
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
        counterparty: "",
        amount: "",
      },
      title: "Новый договор"
    };
  },
  methods: {
    saveContract() {
      this.$emit("save", this.contract);
    },
    closeForm() {
      // Закрыть форму
      this.$emit("close");
    },
  },
};
</script>

<style>

input {
  display: block;
  border: 1px solid #f7f5f5;
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px;
  width: 90%;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  height: 340px;
  width: 280px;
}

.modal-header {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-body {
  padding: 20px 10px;
}

.modal-footer {
  padding: 10px;
  display: flex;
  justify-content: flex-end; /* Этот стиль выровняет все элементы вправо */
  align-items: center; /* Центрирует элементы по вертикали */
}

.modal-footer button {
  margin-right: 5px;
}

</style>