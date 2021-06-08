import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './plugins/vue-async-operations'
import Vuelidate from 'vuelidate'
import router from './router'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  Vuelidate,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app')
