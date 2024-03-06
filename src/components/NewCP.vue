<template>
<div class="main-form">
    <header class="modal-header">
        {{ headerText }}
    </header>

    <div class="form-body">
        <input v-model="CP.name" placeholder="Наименование" @input="resetAttemptedSave" :class="{ 'error': attemptedSave && CP.name }" required/>
        <input v-model="CP.inn" oninput="this.value = this.value.replace(/[^0-9]/g, '')" type="text" placeholder="ИНН" @input="resetAttemptedSave" :class="{ 'error': attemptedSave && !CP.inn }" required/>
        <input v-model="CP.address" placeholder="Адрес" required/>
        <input v-model="CP.description" placeholder="Описание" required/>
        <Files @onFileUpload="onFileUpload" :files="CP.attaches"/>
    </div>

    <footer class="modal-footer">
        <button
        type="button"
        class="btn btn-prima"
        v-if="hasPermission('CAN_EDIT_CONTRACTS')"
        @click="saveCP">
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
    
</template>

<script>
import Files from './Files.vue'
export default {
    components: {Files},
    data() {
    return {
      CP: {
        name: "",
        inn: "",
        address: null,
        description: "",
        attaches: [],
      }
    }},
    methods : {
    closeForm() {
        //сначала понять, введено ли что-нибудь
        //если введено, то показать диалог
        //если подтвердят, то закрыть не сохраняя изменения
        this.$emit("close")
    },
    saveCP() {
        this.$emit("save")
    },
    },
    computed: {
    headerText() {
      return this.CP.name ? this.CP.name : "Новый";
    }
  },
}
</script>

<style scoped>
.main-form {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
}
</style>