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
import DashboardCard from "../components/DashboardCard.vue";
export default {
  components: { DashboardCard },
  name: "AccountPage",
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
