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
import Cookies from "js-cookie";
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitForm() {

      const data = {
        username: this.username,
        password: this.password,
      };

      axios.post('http://localhost:8888/3_contracts/login.php', data)
        .then((response) => {
          // Обработайте ответ от сервера, например, проверьте успешность авторизации
          if (response.data.authorized === true) {
            // Устанавливаем куки "authorized"
            const expiresInDays = 1;
            Cookies.set('authorized', 'true', { expires: expiresInDays });
            // Переход на главную страницу
            this.$router.push('/main');
          } else {
            // Ошибка авторизации
            console.log('Неправильное имя пользователя или пароль');
          }
        })
        .catch((error) => {
          // Обработка ошибки запроса
          console.error('Произошла ошибка при отправке запроса: ' + error);
      });
    },
  },
};
</script>

<style scoped>
    .login-container {
        width: 300px;
        margin: auto;
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