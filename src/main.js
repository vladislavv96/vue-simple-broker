import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import router from "./router";
import { createProvider } from "./vue-apollo";
import VueAsyncOperations from "vue-async-operations";

Vue.config.productionTip = false;
Vue.use(VueAsyncOperations);
new Vue({
  router,
  vuetify,
  Vuelidate,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
