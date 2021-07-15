import './../css/index.css'
import App from '@/components/App.vue';
import {createApp} from 'vue';

if (process.env.NODE_ENV === 'development') {
    require('./../../dist/index.html');
}

const app = createApp(App);
app.mount("#app");
