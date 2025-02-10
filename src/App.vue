<template>
  <v-app>
    <Sidebar />
    <v-main style="padding-left: 250px;">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Sidebar from './components/SideBar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
};
</script>
