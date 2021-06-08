<template>
  <v-app>
    <LayoutBroker :layouts="$options.LAYOUTS" :current="$route.meta.layout" />
  </v-app>
</template>

<script>
import AccountLayout from './layouts/account-layout'
import LoginLayout from './layouts/login-layout'
import LayoutBroker from 'vue-layout-broker'
const LAYOUTS = { AccountLayout, LoginLayout }
export default {
  name: 'App',
  components: { LayoutBroker },
  LAYOUTS,
}
</script>
