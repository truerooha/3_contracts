<template>
  <h1 class="page-h1">Помощь</h1>
  <br>
  <div class="wrapper" name="header-input">
    <p class="input-label">Тема обращения</p>
    <input
        type="text"
    />
    <p class="input-label">Текст</p>
    <input class="big-input"
        type="text"
    />
    <button
      type="button"
      class="btn btn-prima send-button"
      @click="saveUser"
    >
        Отправить
    </button>
  </div>
</template>

<script>
</script>

<style scoped>
.send-button {
  margin-top: 20px;
}
.input-label {
  font-weight: 500;
  margin-bottom: 10px;
}

.big-input {
  height: 120px;
}
input {
  border: 1px solid #CBD5E0;
  border-radius: 10px;
  outline: none;
  height: 28px;
  margin: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 60%;
}
</style>