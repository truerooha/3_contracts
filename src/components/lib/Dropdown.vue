<template>
  <div class="custom-select">
    <select v-model="selectedOption" @change="handleSelectChange" :class="{ 'error': attemptedSave && !extOption }">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
      options: {
        type: Array,
        required: true,
      },
      extOption: {
        type: [String, Number], 
        default: null,
      },
      attemptedSave: {
        type: Boolean,
        default: false,
      },
  },
  data() {
    return {
      selectedOption: this.extOption,
    };
  },
  watch: {
    extOption(newVal) {
      this.selectedOption = newVal;
    },
  },
  methods: {
    handleSelectChange() {
    const selectedOption = this.options.find(option => option.id === this.selectedOption);
      //this.$emit("input", this.selectedOption); //TODO разобраться, надо ли это
      this.$emit("option-selected", {
        id: this.selectedOption,
        value: selectedOption ? selectedOption.name : null,
      });
    },
    },
};
</script>

<style scoped>
.custom-select {
  width: 97%;
}

select {
    border: 1px solid #f2f8e4;
    margin-top: 10px;
    border-radius: 6px;
    padding: 10px;
    width: 100%;
}

.error {
  border-color: red;
}
</style>