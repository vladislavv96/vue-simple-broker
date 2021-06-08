<template>
  <div>
    <div class="title">
      <h1>Account Page</h1>
      <v-btn @click="logout" class="mt-5">Logout</v-btn>
    </div>
    <v-divider class="mt-5 mb-5" inset></v-divider>
    <DashboardCard />
    <DashboardCard />
  </div>
</template>

<script>
import DashboardCard from '../../../components/dashboard-card'
import { logOut } from '@/services/auth/'
export default {
  components: { DashboardCard },
  name: 'AccountPage',
  methods: {
    logout() {
      logOut(false)
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
