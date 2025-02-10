<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import EquipamentoController from '@/controller/EquipamentoController';
  import { type IEquipamento, Equipamento } from '@/model/Equipamento';

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

  const equipamentoController = new EquipamentoController();

  //Listas
  const equipamentos = ref<IEquipamento[]>([]);


  //Editável
  const dialog = ref(false)
  const dialogEdit = ref(false)
  const equip = ref<IEquipamento>( new Equipamento(0,'', 0, 0));

  //Listar
  const listarequipamentos = async () => {
    equipamentos.value = await equipamentoController.listarEquipamentos()
  }

  //Quando ligar
  onMounted(() => {
    listarequipamentos();
  })

  //Criar
  const criarequipamento = () => {
    equip.value = new Equipamento(0, '', 0, 0);
    dialog.value = true;
  }

  // Editar (Horimetro/Odometro)
  const editarEquipamento = (equipamento: IEquipamento) => {
    equip.value = {
      ...equipamento,
      HorimetroOuOdometro: equipamento.HorimetroOuOdometro,
    };
    dialogEdit.value = true;
  };

  // Excluir
  const excluirEquipamento= async (Id: number) => {
    if (confirm('Tem certeza que deseja excluir este equipamento?')) {
      try {
        await equipamentoController.excluirEquipamento(Id);
        snackbarSuccess('Equipamento excluído com sucesso!');
        await listarequipamentos();
      } catch (error) {
        console.error("Erro ao excluir equipamento:", error);
        snackbarError('Erro ao excluir equipamento.');
      }
    }
  };

  const salvarEquipamento = async () => {
    try{
      if (equip.value.Id) {
        await equipamentoController.atualizarHorimetro(equip.value.Id, equip.value.HorimetroOuOdometro);
        snackbarSuccess('Uso Atualizado');
      }
      else {
        await equipamentoController.cadastrarEquipamento(equip.value);
        snackbarSuccess('Equipamento Cadastrado');
      }
      dialog.value = false;
      dialogEdit.value = false;
    } catch (error) {
      console.error("Erro ao salvar equipamento:", error);
      snackbarError('Erro ao salvar equipamento.');
    }
  }
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Equipamentos </span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="criarequipamento">Novo Equipamento</v-btn>
      </v-card-title>

      <!-- Tabela de Bolsas -->
      <v-data-table
        :headers="[
          { title: 'Tipo', key: 'Tipo' },
          { title: 'Modelo', key: 'IdModelo' },
          { title: 'Uso', key: 'HorimetroOuOdometro' },
        ]"
        :items="equipamentos"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.Tipo }}  </td>
            <td>  {{ item.IdModelo }} </td>
            <td>  {{ item.HorimetroOuOdometro }}  </td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="blue" size="small" @click="editarEquipamento(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirEquipamento(item.Id!)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal Edição -->
    <v-dialog v-model="dialogEdit" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Equipamento</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Horimetro ou Odometro -->
            <label class="required-label">Horimetro/Odometro</label>
            <v-text-field
              v-model="equip.HorimetroOuOdometro"
              type="number"
              label="Valor"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="dialogEdit = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarEquipamento">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de Criação -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Novo Equipamento</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Tipo de Equipamento -->
            <label class="required-label">Tipo de Equipamento</label>
            <v-text-field
              v-model="equip.Tipo"
              type="text"
              label="Tipo de equipamento"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Id do Modelo -->
            <label class="required-label">Modelo</label>
            <v-text-field
              v-model="equip.IdModelo"
              type="text"
              label="Modelo do Equipamento"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Horimetro ou Odometro -->
            <label class="required-label">Horimetro/Odometro</label>
            <v-text-field
              v-model="equip.HorimetroOuOdometro"
              type="number"
              label="Valor"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

<v-card-actions>
  <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
  <v-btn color="green" @click="salvarEquipamento">Salvar</v-btn>
</v-card-actions>
</v-card>
</v-dialog>

</v-container>
</template>
