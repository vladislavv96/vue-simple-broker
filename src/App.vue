<template>
  <v-app>
    <LayoutBroker
      :layouts="$options.LAYOUTS"
      :current="$route.meta.layout"
      :layout-classes="$route.meta.layoutClasses"
    />
  </v-app>
</template>

<script>
import AccountLayout from './layouts/AccountLayout.vue';
import LoginLayout from "./layouts/LoginLayout.vue";
import LayoutBroker from 'vue-layout-broker'
const LAYOUTS = {AccountLayout, LoginLayout}
export default {
  name: "App",
  components: {LayoutBroker},
  data: () => ({
    login: "",
    password: "",
  }),
  computed: {
  },
  LAYOUTS
};
</script>
