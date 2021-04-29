import Vue from 'vue'
import App from './App'
import routes from '../routes.js'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes : routes,
})

new Vue({
  //el: '#app',
  render: h => h(App),
  router: router
}).$mount('#app')
