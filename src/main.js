import 'core-js/stable'
import Vue from 'vue'
//import CoreuiVue from '@coreui/vue/src'
import CoreuiVuePro from '@coreui/vue-pro/src/index.js'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/index'
import axios from 'axios'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

require("@/store/subscriber");

Vue.use(CoreuiVuePro)
Vue.prototype.$log = console.log.bind(console)
axios.defaults.baseURL = process.env.VUE_APP_BACKEND + "/api/";

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    //CIcon component documentation: https://coreui.io/vue/docs/components/icon
    icons,
    template: '<App/>',
    components: {
      App
    }
  })
});