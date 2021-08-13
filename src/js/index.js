import './../css/index.css'
import Calculator from '@/screens/Calculator.vue';
import {createApp} from 'vue';

if (process.env.NODE_ENV === 'development') {
    require('./../../dist/index.html');
}

const app = createApp(Calculator);
app.mount("#app");

window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js");
    }
});
