import Vue from 'vue'
import App from './App'
import router from '../router.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/aliExpress.css'
import '@/assets/css/main.css'

Vue.config.productionTip = false


new Vue({
  //el: '#app',
  render: h => h(App),
  router: router
}).$mount('#app')
