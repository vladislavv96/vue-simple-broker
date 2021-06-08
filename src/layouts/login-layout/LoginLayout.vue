<template>
  <div>
    <v-app-bar dark app class="d-flex justify-center">
      <v-app-bar-title>
        <h1>Login Layout</h1>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "LoginLayout",
};
</script>

<style></style>
