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
            <v-btn @click="submit">Sumbmit</v-btn>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "LoginPage",
  data() {
    return {
      login: "",
      password: "",
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
      minLength: minLength(8),
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("VALID");
        localStorage.setItem("auth", true);
        this.$router.push("Account");
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
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      return errors;
    },
  },
  mounted() {
    if (localStorage.getItem("auth") === "true")
      this.$router.push({ name: "Account" });
  },
};
</script>

<style scoped></style>
