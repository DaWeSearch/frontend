import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'

import Axios from 'axios'
Vue.prototype.$http = Axios;
Axios.defaults.baseURL = " https://vvt6vdg772.execute-api.eu-central-1.amazonaws.com/"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
