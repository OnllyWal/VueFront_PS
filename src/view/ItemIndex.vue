<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ItemController from '@/controller/ItemController';
  import { type IItem, Item } from '@/model/Item';

  const snackbar = ref(false);
  const mensagemSnackbar = ref('');
  const corSnackbar = ref('');

  function snackbarSuccess(message?: string) {
    corSnackbar.value = 'success';
    snackbar.value = true;
    mensagemSnackbar.value = message || 'Ação concluída com sucesso!';
  }

  function snackbarError(message?: string) {
    corSnackbar.value = 'error';
    snackbar.value = true;
    mensagemSnackbar.value = message || 'Ocorreu um erro!';
  }

  //Instancias Controllers

  const itemController = new ItemController();

  //Listas
  const Items = ref<IItem[]>([]);


  //Editável
  const dialog = ref(false)
  const sitem = ref<IItem>( new Item(0,'', 0, '', 0));

  //Listar
  const listarItems = async () => {
    Items.value = await itemController.getItens()
  }

  //Quando ligar
  onMounted(() => {
    listarItems();
    console.log(Items)
  })

  //Criar
  const criarItem = () => {
    sitem.value = new Item(0,'', 0, '', 0);
    dialog.value = true;
  }

  // Excluir
  const excluirItem= async (Id: number) => {
    if (confirm('Tem certeza que deseja excluir este Item?')) {
      try {
        await itemController.excluirItem(Id);
        snackbarSuccess('Item excluído com sucesso!');
        await listarItems();
      } catch (error) {
        console.error("Erro ao excluir Item:", error);
        snackbarError('Erro ao excluir Item.');
      }
    }
  };

  const salvarItem = async () => {
    try{
      await itemController.cadastrarItem(sitem.value);
      snackbarSuccess('Item Cadastrado');
      dialog.value = false;
    } catch (error) {
      console.error("Erro ao salvar Item:", error);
      snackbarError('Erro ao salvar Item.');
    }
  }
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Items </span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="criarItem">Novo Item</v-btn>
      </v-card-title>

      <!-- Tabela de Bolsas -->
      <v-data-table
        :headers="[
          { title: 'Id', key: 'id' },
          { title: 'Tipo', key: 'tipo' },
          { title: 'Unidade de Medida', key: 'unidadeDeMedida' },
          { title: 'Descrição', key: 'descricao' },
          { title: 'Quantidade', key: 'quantidade' }
        ]"
        :items="Items"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.id }}  </td>
            <td>  {{ item.tipo }}  </td>
            <td>  {{ item.unidadeDeMedida }} </td>
            <td>  {{ item.descricao }}  </td>
            <td>  {{ item.quantidade }}  </td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="red" size="small" @click="excluirItem(item.id!)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>


    <!-- Dialog de Criação -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Novo Item</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Tipo de Item -->
            <label class="required-label">Tipo</label>
            <v-text-field
              v-model="sitem.tipo"
              type="text"
              label="Tipo de Item"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Unidade de Medida -->
            <label class="required-label">Medida</label>
            <v-text-field
              v-model="sitem.unidadeDeMedida"
              type="text"
              label="Unidade de Medida"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Descrição -->
            <label class="required-label">Descrição</label>
            <v-text-field
              v-model="sitem.descricao"
              type="text"
              label="Descrição do Item"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Quantidade -->
            <label class="required-label"> Quantidade</label>
            <v-text-field
              v-model="sitem.quantidade"
              type="number"
              label="Quantidade"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

<v-card-actions>
  <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
  <v-btn color="green" @click="salvarItem">Salvar</v-btn>
</v-card-actions>
</v-card>
</v-dialog>

</v-container>
</template>
