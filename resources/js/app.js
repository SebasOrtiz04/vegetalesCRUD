import './bootstrap';
import {createApp} from "vue";
import router from "../src/router/index"
import App from "../src/App.vue";

createApp(App).use(router).mount("#app");

