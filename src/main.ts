import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// App.config.globalProperties.getImage = () => {};
// for global usage

createApp(App).use(store).use(router).mount('#app');
