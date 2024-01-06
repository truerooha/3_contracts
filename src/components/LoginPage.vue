<template>
  <div class="login-container">
    <h1>Авторизация</h1>
    <form class="login-form" @submit.prevent="submitForm">
      <input v-model="username" v-bind:style="{ borderColor: isValid ? '' : '#E02424' }" @input="updateValidity" type="text" name="username" placeholder="Логин" required>
      <input v-model="password" v-bind:style="{ borderColor: isValid ? '' : '#E02424' }" @input="updateValidity" type="password" name="password" placeholder="Пароль" required>
      <button class="btn btn-prima" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from '../axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      isValid: true
    };
  },
  methods: {
    updateValidity() {
      this.isValid = true;
    },
    submitForm() {

      const data = {
        username: this.username,
        password: this.password
      };

      axios.post('http://localhost:3000/users/login', data)
        .then((response) => {

          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            this.$router.push('/main');
          } else {
            console.log('Неправильное имя пользователя или пароль');
          }
        })
        .catch((error) => {
          console.error('Произошла ошибка при отправке запроса: ' + error);
      });
    },
  },
};
</script>

<style scoped>
  .login-container {
      width: 320px;
      margin: auto;
      text-align: center;
      padding: 20px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 15px;
      margin-top: 200px;
      box-shadow: 0px 0px 50px rgba(49,196,141, 0.1); 
  }
  
  .login-container h1 {
      color: #333;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-form input {
      width: 90%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 10px;
  }
</style>