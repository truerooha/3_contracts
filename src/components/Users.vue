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
</template>

<script>
import axios from '../axios';
import { useToast } from "vue-toastification";
import Dialog from './lib/Dialog.vue';
import Tabs from './Tabs.vue'


export default {
  components: {Dialog, Tabs},
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
    async handleConfirm() {
      try {
        const toast = useToast();
        const response = await axios.delete(`http://localhost:3000/users/remove/${this.deletedUserID}`)
        this.users = this.users.filter(user => user.id !== this.deletedUserID);
        this.deletedUserID = null
        toast.success("Пользователь успешно удалён", {
          timeout: 2000
        });
        this.closeModal()
  
        } catch (error) {
          console.error('Ошибка при удалении пользователя:', error);
        }
    },
    async saveUser() {
      if (!this.isFormValid()) {
        const toast = useToast();
        toast.error("Не заполнены обязательные поля", {
              timeout: 2000
            });
        return
      }
      const userJSON = JSON.stringify(this.newUser);
      try {
      const response = await axios.post('http://localhost:3000/users/new', userJSON, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const toast = useToast();

      if (response.status === 200) {
        toast.success("Пользователь успешно создан", {
          timeout: 2000
        });
        this.newUser.username = "";
        this.newUser.password = "";
        this.loadUsers();
      } else if (response.status === 207) {
        toast.error(response.data.Message, {
          timeout: 2000
        });
      }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
  input {
    width: 200p;
  }
  .new-user {
    display: flex;
    justify-content: left;
    gap: 10px;
    margin-top: 30px;
    width: 50%;
  }

  #users-table {
    margin-top: 20px;
  }
</style>