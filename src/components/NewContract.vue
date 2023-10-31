<template>
      <div class="modal-backdrop">
      <div class="modal theme-color">
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
  },
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
  background-color: #F9FAF6;
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