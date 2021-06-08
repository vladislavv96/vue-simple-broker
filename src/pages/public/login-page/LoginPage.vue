<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2" offset="5">
          <login-form
            @handle="$async.authHandler.$perform"
            :isPending="$async.authHandler.$pending || undefined"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '../../../components/login-form'
import { login, isAuthenticated } from '@/services/auth/'

// import gql from "graphql-tag";

export default {
  components: { LoginForm },
  name: 'LoginPage',
  methods: {
    auth({ username, password }) {
      return this.$apollo
        .mutate({
          mutation: require('@/services/gql/authenticate.gql'),
          variables: { login: username, password },
        })
        .then(
          (r) => {
            login(r.data.authenticate)
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push({ name: 'account' })
            }
          },
          () => {
            console.log('Login or pass invalid')
          }
        )
    },
  },
  mounted() {
    if (isAuthenticated()) {
      this.$router.push({ name: 'account' })
    }
  },
  asyncOperations: {
    authHandler: 'auth',
  },
}
</script>

<style scoped></style>
