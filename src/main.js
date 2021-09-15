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
import VCalendar from 'v-calendar'

Vue.use(VCalendar)
Vue.use(Vuelidate)

import excel from 'vue-excel-export'
 
Vue.use(excel)

const moment = require('moment')
 
Vue.use(require('vue-moment'), {
    moment
});

require("@/store/subscriber");

Vue.use(CoreuiVuePro)
Vue.prototype.$log = console.log.bind(console)
axios.defaults.baseURL = process.env.VUE_APP_BACKEND + "/api/";

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    data: {
      btn_load(status, elem, text) {
        var button = document.getElementById(elem);
        if (status) {
          button.innerHTML = text + ' <div role="status" aria-hidden="false" aria-label="Loading" class="spinner-border spinner-border-sm text-white"></div>';
          button.disabled = true; 
        } else {
          button.innerHTML = text;
          button.disabled = false; 
        }
      },
      momentParse(data) {
          return moment(data).fromNow();
      },
      momentFormat(data){
        return moment(data, "YYYY-MM-DD h:mm:ss").format('YYYY/MM/DD');
      },
      momentFormatDateTime(data){
        return moment(data, "YYYY-MM-DD h:mm:ss").format('YYYY/MM/DD hh:mm A');
      },
    },
    icons,
    template: '<App/>',
    components: {
      App
    }
  })
});