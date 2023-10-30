<template>
   <div class="contract-form">
    <!-- Форма для ввода данных о договоре -->
    <input v-model="contract.number" placeholder="Номер договора" />
    <input v-model="contract.date" placeholder="Дата договора" />
    <input v-model="contract.counterparty" placeholder="Контрагент" />
    <input v-model="contract.amount" placeholder="Сумма" />

    <!-- Кнопка для сохранения данных -->
    <button @click="saveContract">Сохранить</button>

    <!-- Кнопка для закрытия формы -->
    <button @click="closeForm">Закрыть</button>
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

</style>