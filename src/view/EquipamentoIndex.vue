<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import EquipamentoController from '@/controller/EquipamentoController';
  import { type IEquipamento, Equipamento } from '@/model/Equipamento';
  import {type IModelo} from '@/model/Modelo';
  import ModeloController from '@/controller/ModeloController';

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
  const modeloController = new ModeloController();

  //Listas
  const equipamentos = ref<IEquipamento[]>([]);
  const modelos = ref<IModelo[]>([]);


  //Editável
  const dialog = ref(false);
  const dialogEdit = ref(false);
  const equip = ref<IEquipamento>( new Equipamento(0,'', 0, 0));

  //Listar
  const listarequipamentos = async () => {
    equipamentos.value = await equipamentoController.listarEquipamentos()
  };
  const listarModelos = async () => {
    modelos.value = await modeloController.listarModelos();
  };

  //Quando ligar
  onMounted(() => {
    listarequipamentos();
    listarModelos();
    console.log(equipamentos)
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
      horimetroOuOdometro: equipamento.horimetroOuOdometro,
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

  const atualizarHorimetro = async () => {
    try{
      await equipamentoController.atualizarHorimetro(equip.value.id, equip.value.horimetroOuOdometro)
    } catch (error){
      console.error("Erro ao salvar Horimetro:", error);
      snackbarError('Erro ao salvar Horimetro.');
    }
  };

  const salvarEquipamento = async () => {
    try{
        await equipamentoController.cadastrarEquipamento(equip.value);
        console.log(equip.value.idModelo)
        console.log(equip.value.horimetroOuOdometro)
        snackbarSuccess('Equipamento Cadastrado');
        console.log(equip.value)
        dialog.value = false;
        dialogEdit.value = false;
        await listarequipamentos()
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
          { title: 'Id', key: 'id' },
          { title: 'Tipo', key: 'tipo' },
          { title: 'IdModelo', key: 'idModelo' },
          { title: 'Uso', key: 'horimetroOuOdometro' },
        ]"
        :items="equipamentos"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.id }}  </td>
            <td>  {{ item.tipo }}  </td>
            <td>  {{ item.idModelo }} </td>
            <td>  {{ item.horimetroOuOdometro }}  </td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="blue" size="small" @click="editarEquipamento(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirEquipamento(item.id!)">
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
              v-model="equip.horimetroOuOdometro"
              type="number"
              label="Valor"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="dialogEdit = false">Cancelar</v-btn>
          <v-btn color="green" @click="atualizarHorimetro">Salvar</v-btn>
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
              v-model="equip.tipo"
              type="text"
              label="Tipo de equipamento"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Seleção Modelo -->
            <v-select
              v-model="equip.idModelo"
              :items="modelos"
              item-title="tipo"
              item-value="id"
              label="Selecione o Modelo"
              outlined
              class="mb-4"
            ></v-select>

            <!-- Horimetro ou Odometro -->
            <label class="required-label">Horimetro/Odometro</label>
            <v-text-field
              v-model="equip.horimetroOuOdometro"
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
