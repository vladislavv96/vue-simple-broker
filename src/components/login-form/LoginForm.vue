<template>
  <div>
    <form @submit.prevent="submit">
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
      <v-btn type="submit" :loading="isPending">Submit</v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
// import gql from "graphql-tag";

export default {
  mixins: [validationMixin],
  name: "LoginForm",
  props: {
    isPending: {
      default: false,
      type: Boolean,
    },
    isResolved: {
      default: true,
      type: Boolean,
    },
    isRejected: {
      default: false,
      type: Boolean,
    },
  },
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
        this.$emit("handle", {
          username: this.login,
          password: this.password,
        });
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
    console.log(this.isPending);
  },
};
</script>

<style scoped></style>
