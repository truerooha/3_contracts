import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './global.css'
import Toast from "vue-toastification"
// Import the CSS or use your own!
import "vue-toastification/dist/index.css"
import Skeleton from 'vue-loading-skeleton';
import "vue-loading-skeleton/dist/style.css"



const app = createApp(App)

const options = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(router)
app.mount('#app')
app.use(Skeleton)

