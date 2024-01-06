<template>
  <Dialog
        v-show="isDialogVisible"
        question="Вы уверены, что хотите удалить этого пользователя?"
        confirmText="Да"
        cancelText="Нет"
        buttonType = "error"
        @close="closeModal"
        @confirm="handleConfirm"
    />
  <h1 class="page-h1">Настройки системы</h1>
    <div class="page-content settings-page">
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
            <th>ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1}}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.id }}</td>
            <td>
              <span @click="deleteUser(user.id)">
                <img src="@/assets/icons/trash.svg" class="lil-icon" alt="Удалить">
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      </section>
    </div>
</template>

<script>
import axios from '../axios';
import { useToast } from "vue-toastification";
import Dialog from './lib/Dialog.vue';


export default {
    name: 'Settings',
    components: {Dialog },
    data() {
      return {
        newUser: {
          username: "",
          password: "",
        },
        users: [],
        isDialogVisible: false,
        deletedUserID: null
      };
    },
    mounted() {
      this.loadUsers();
    },
    methods: {
      isFormValid() {
        return this.newUser.username.trim() !== '' && this.newUser.password.trim() !== '';
      },
      loadUsers() {
        axios.get('http://localhost:3000/users')
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных:', error);
        });
      },

      deleteUser(userID) {
        this.deletedUserID = userID
        this.isDialogVisible = true;  
      },
      closeModal() {
        this.isDialogVisible = false;
      },
      handleConfirm() {
          axios.delete(`http://localhost:3000/users/remove/${this.deletedUserID}`)
          .then(() => {
            this.users = this.users.filter(user => user.id !== this.deletedUserID);
            this.deletedUserID = null
            console.log('Пользователь успешно удален');
            this.closeModal()
          })
          .catch((error) => {
            console.error('Ошибка при удалении пользователя:', error);
          });
      },
      saveUser() {
        if (!this.isFormValid()) {
          const toast = useToast();
          toast.error("Не заполнены обязательные поля", {
                timeout: 2000
              });
          return
        }
        const userJSON = JSON.stringify(this.newUser);

        axios.post('http://localhost:3000/users/new', userJSON, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            const toast = useToast();

            if (response.status == 200) {
              toast.success("Пользователь успешно создан", {
                timeout: 2000
              });
              this.newUser.username = ""
              this.newUser.password = ""
              this.loadUsers();
            } else if (response.status == 207) {
              toast.error(response.data.Message, {
                timeout: 2000
              });

            }
      
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