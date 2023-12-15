import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import router from './router'
import './global.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import Skeleton from 'vue-loading-skeleton';
import "vue-loading-skeleton/dist/style.css"

const app = createApp(App)

const options = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(router)
app.use(Skeleton)
app.use(store)
app.mount('#app')

