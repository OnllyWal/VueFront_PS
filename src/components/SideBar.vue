<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-navigation-drawer app permanent width="250" class="custom-sidebar">
    <v-list dense>
      <v-list-item title="Gerenciador" class="text-white">
        <template v-slot:prepend>
          <v-icon>mdi-alpha-c-box</v-icon>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-briefcase-outline"
        title="Equipamentos"
        value="equipamentos"
        class="text-white"
        to="/equipamento"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-cash-multiple"
        title="Itens"
        value="itens"
        class="text-white"
        to="/item"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Manutenção"
        value="manutencoes"
        class="text-white"
        to="/manutencao"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-lightbulb-on-outline"
        title="Modelo"
        value="modelos"
        class="text-white"
        to="/modelo"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-lightbulb-on-outline"
        title="Ordem de Serviço"
        value="ordemservico"
        class="text-white"
        to="/servico"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  name: 'SideBar',
};
</script>

<style scoped>
.custom-sidebar {
  background-color: #171f27;
}

.text-white {
  color: white !important;
}
</style>
