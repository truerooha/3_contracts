<template>
  <div class="login-container">
    <h1>Авторизация</h1>
    <form class="login-form" @submit.prevent="submitForm">
      <input v-model="username" type="text" name="username" placeholder="Логин" required>
      <input v-model="password" type="password" name="password" placeholder="Пароль" required>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      this.$router.push('/main');
    },
  },
};
</script>

<style scoped>
    body {
        background-size: cover;
        background-position: center;
        font-family: Arial, sans-serif;
    }
    .login-container {
        width: 300px;
        margin: 0 auto;
        text-align: center;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        margin-top: 100px;
    }
    .login-container h1 {
        color: #333;
    }
    .login-form input {
        width: 90%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .login-form button {
        width: 90%;
        padding: 10px;
        background-color: #3498db; /* Голубой цвет кнопки */
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
    }
    .login-form button:hover {
        background-color: #2980b9; /* Голубой цвет при наведении */
    }
</style>