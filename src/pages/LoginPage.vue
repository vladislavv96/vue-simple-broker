<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2" offset="5">
          <form>
            <v-text-field
              v-model="login"
              label="Login"
              :error-messages="loginErrors"
              @input="$v.login.$touch()"
              @blur="$v.login.$touch()"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
              label="Password"
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              required
            ></v-text-field>
            <v-btn @click="submit">Submit</v-btn>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { login, isAuthenticated } from "@/services/auth/";
// import gql from "graphql-tag";

export default {
  mixins: [validationMixin],
  name: "LoginPage",
  data() {
    return {
      login: "admin@admin.com",
      password: "admin",
      showPass: false,
    };
  },
  validations: {
    login: {
      required,
      minLength: minLength(8),
    },
    password: {
      required,
      // minLength: minLength(8),
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("VALID");
        this.$apollo
          .mutate({
            mutation: require("@/graphql/authenticate.gql"),
            variables: { login: this.login, password: this.password },
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
      }
    },
  },
  computed: {
    loginErrors() {
      const errors = [];
      if (!this.$v.login.$dirty) return errors;
      !this.$v.login.required && errors.push("Name is required.");
      !this.$v.login.minLength &&
        errors.push("Login must be at least 8 characters long");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      // !this.$v.password.minLength &&
      //   errors.push("Password must be at least 8 characters long");
      return errors;
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
