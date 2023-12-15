<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>{{ question }}</p>
      <div class="button-container">
        <button class="btn" :class="buttonClass" @click="confirmAction">{{ confirmText }}</button>
        <button class="btn btn-secondary" @click="cancelAction">{{ cancelText }}</button>
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
    buttonType: {
      type: String,
      required: true
    }
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
  computed: {
    buttonClass() {
      return {
        'btn-prima': this.buttonType === 'success',
        'btn-error': this.buttonType === 'error'
      };
    }
  }
};
</script>

<style scoped>
/* Стили для внешнего вида модального окна */
p {
    height: 55%;
}
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
    width: 320px;
    height: 180px;
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
}

.button-container {
  text-align: center;
}

button {
  margin: 0 10px;
  padding: 10px;
}
</style>