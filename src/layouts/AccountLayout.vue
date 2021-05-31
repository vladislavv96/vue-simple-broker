<template>
  <div>
    <v-app-bar dark app class="d-flex justify-center">
      <v-app-bar-title>
        <h1>Account Layout</h1>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container class="mt-5">
        <v-row>
          <v-col cols="3">
            <v-card class="mx-auto" max-width="300" tile>
              <v-list rounded>
                <v-subheader>SIDEBAR</v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="6">
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "AccountLayout",
  data() {
    return {
      items: [
        {
          text: "Person",
          icon: "mdi-account",
        },
        {
          text: "Inventory",
          icon: "mdi-briefcase",
        },
        {
          text: "Calendar",
          icon: "mdi-calendar",
        },
        {
          text: "Bug Report",
          icon: "mdi-bug",
        },
        {
          text: "Contacts",
          icon: "mdi-card-account-mail",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
