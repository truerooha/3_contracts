<template>
  <h1 class="page-h1">Настройки системы</h1>
    <div class="page-content settings-page theme-color">
      <section class="new-user">
          <input v-model="newUser.username" placeholder="Имя пользователя" required/>
          <input v-model="newUser.password" placeholder="Пароль" required/>
          <br>
          <button
              type="button"
              class="btn btn-prima"
              @click="saveUser"
            >
              Создать
            </button>
      </section>  

      <section class="all-users">
        <table class="common-table" id="users-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Имя пользователя</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
          </tr>
        </tbody>
      </table>
      </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Settings',
    data() {
      return {
        newUser: {
          username: "",
          password: "",
        },
        users: []
      };
    },
    mounted() {
      this.loadUsers();
    },
    methods: {
      loadUsers() {
        axios.get('http://localhost:8888/3_contracts/server/loadUsers.php')
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных:', error);
        });
      },
      saveUser() {
        const userJSON = JSON.stringify(this.newUser);

        axios.post('http://localhost:8888/3_contracts/server/saveUser.php', userJSON, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            this.newUser.username = ""
            this.newUser.password = ""
            this.loadUsers();
          })
          .catch((error) => {
            console.error('Ошибка при сохранении пользователя:', error);
          });
      }
    }
}
</script>

<style scoped>
  .settings-page {
    display: block;
    height: 90%;
    border-radius: 10px;
    padding: 30px;
    justify-self: center;
    align-self: center;
  }
  .new-user {
    width: 280px;
  }

  #users-table {
    margin-top: 20px;
  }
</style>