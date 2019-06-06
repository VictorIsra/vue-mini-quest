import '@babel/polyfill'
import 'mutationobserver-shim'
import App from './App.vue'
import Vue from 'vue'
import router from './router'
import store from './store'
import TodoList from './components/TodoList.vue'
import axios from 'axios';

/*a ordem de import importa! importe o css somente por após improtar o App:*/
import './plugins/bootstrap-vue'

Vue.config.productionTip = false
//importa globalmente o componente:
Vue.component('todoList', TodoList);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')