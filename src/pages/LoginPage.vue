<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2" offset="5">
          <login-form @handle="auth" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import { login, isAuthenticated } from "@/services/auth/";

// import gql from "graphql-tag";

export default {
  components: { LoginForm },
  name: "LoginPage",
  methods: {
    auth({ username, password }) {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/authenticate.gql"),
          variables: { login: username, password },
        })
        .then((r) => {
          login(r.data.authenticate);
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push({ name: "account" });
          }
        })
        .catch(() => console.log("Login or password invalid"));
    },
  },
  mounted() {
    if (isAuthenticated) {
      this.$router.push({ name: "account" });
    }
  },
};
</script>

<style scoped></style>
