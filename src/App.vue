<template>
  <v-app>
    <LayoutBroker
      :layouts="$options.LAYOUTS"
      :current="$route.meta.layout"
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
  LAYOUTS
};
</script>
