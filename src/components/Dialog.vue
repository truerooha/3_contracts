<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>{{ question }}</p>
      <div class="button-container">
        <button @click="confirmAction">{{ confirmText }}</button>
        <button @click="cancelAction">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: "Подтвердить",
    },
    cancelText: {
      type: String,
      default: "Отменить",
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmAction() {
      this.$emit("confirm");
      this.closeModal();
    },
    cancelAction() {
      this.$emit("cancel");
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Стили для внешнего вида модального окна */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    width: 288px;
    height: 173px;
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 20px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.button-container {
  text-align: center;
}

button {
  margin: 0 10px;
  padding: 10px;
}
</style>