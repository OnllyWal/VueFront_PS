<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ManutencaoController from '@/controller/ManutencaoController';
  import { type IManutencao, Manutencao } from '@/model/Manutencao';
  import { type IItem, Item } from '@/model/Item';
  import ItemController from '@/controller/ItemController';

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
  const manutencaoController = new ManutencaoController();

  //Listas
  const Manutencoes = ref<IManutencao[]>([]);
  const Itens = ref<IItem[]>([]);


  //Editável
  const dialog = ref(false)
  const dialogEdit = ref(false)
  const manu = ref<IManutencao>( new Manutencao(0,'', 0, '', []));

  //Listar
  const listarManutencoes = async () => {
    Manutencoes.value = await manutencaoController.listarManutencoes();
  }

  const listarItens = async () => {
    Itens.value = await itemController.getItens();
  }

  //Quando ligar
  onMounted(() => {
    listarManutencoes();
    listarItens();
  })

  //Criar
  const criarManutencao = () => {
    manu.value = new Manutencao(0, '', 0, '', []);
    dialog.value = true;
  }
  
  // Editar (Horimetro/Odometro)
  const editarManutencao = (Manutencao: IManutencao) => {
    manu.value = {
      ...Manutencao,
      HorimetroOuOdometro: Manutencao.HorimetroOuOdometro,
    };
    dialogEdit.value = true;
  };

  // Excluir
  const excluirManutencao= async (Id: number) => {
    if (confirm('Tem certeza que deseja excluir este Manutencao?')) {
      try {
        await manutencaoController.excluirManutencao(Id);
        snackbarSuccess('Manutencao excluído com sucesso!');
        await listarManutencoes();
      } catch (error) {
        console.error("Erro ao excluir Manutencao:", error);
        snackbarError('Erro ao excluir Manutencao.');
      }
    }
  };

  const salvarManutencao = async () => {
    try{
      await manutencaoController.cadastrarManutencao(manu.value);
      snackbarSuccess('Manutencao Cadastrado');
      dialog.value = false;
      dialogEdit.value = false;
    } catch (error) {
      console.error("Erro ao salvar Manutencao:", error);
      snackbarError('Erro ao salvar Manutencao.');
    }
  }
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Manutencaos </span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="criarManutencao">Novo Manutencao</v-btn>
      </v-card-title>

      <!-- Tabela de Manutenções -->
      <v-data-table
        :headers="[
          { title: 'Tipo', key: 'Tipo' },
          { title: 'Recorrência', key: 'Recorrencia' },
          { title: 'Status', key: 'Status' },
          { title: 'Itens', key: 'Itens' },
        ]"
        :items="Manutencoes"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.Tipo }}  </td>
            <td>  {{ item.Recorrencia }} </td>
            <td>  {{ item.Status }}  </td>
            <td>  {{ item.Itens.join(', ') }}  </td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="blue" size="small" @click="editarManutencao(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirManutencao(item.Id!)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal Add Item -->
    <v-dialog v-model="dialogEdit" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Manutencao</span>
        </v-card-title>
        <v-card-text>
          <v-form>
              <!-- Seleção de Itens -->
            <v-select
              v-model="manu.Itens"
              :items="Itens"
              item-title="Tipo"
              item-value="Id"
              label="Selecione os Itens"
              multiple
              outlined
              class="mb-4"
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="dialogEdit = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarManutencao">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de Criação -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Nova Manutencao</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Tipo de Manutencao -->
            <label class="required-label">Tipo</label>
            <v-text-field
              v-model="manu.Tipo"
              type="text"
              label="Tipo de Manutencao"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Id do Modelo -->
            <label class="required-label">Status</label>
            <v-text-field
              v-model="manu.Status"
              type="text"
              label="Status da Manutencao"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Horimetro ou Odometro -->
            <label class="required-label">Recorrencia</label>
            <v-text-field
              v-model="manu.Recorrencia"
              type="number"
              label="Recorrencia da Manutencao"
              class="mb-4"
              outlined
            ></v-text-field>  

            <!-- Seleção Itens -->
            <v-select
              v-model="manu.Itens"
              :items="Itens"
              item-title="Tipo"
              item-value="Id"
              label="Selecione os Itens"
              multiple
              outlined
              class="mb-4"          
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarManutencao">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
