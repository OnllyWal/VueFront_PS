<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ModeloController from '@/controller/ModeloController';
  import { type IModelo, Modelo } from '@/model/Modelo';
  import { type IManutencao} from '@/model/Manutencao';
  import ManutencaoController from '@/controller/ManutencaoController';

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
  const modeloController = new ModeloController();
  const manutencaoController = new ManutencaoController();

  //Listas
  const Modelos = ref<IModelo[]>([]);
  const Manutencoes = ref<IManutencao[]>([]);

  //pop-ups(input)
  const dialog = ref(false)         //Criação
  const dialogAdd = ref(false)      // Edição

  //Objeto Modelo vazio
  const mode = ref<IModelo>( new Modelo(0,'', '', []));

  //Id de ObjModelo a ser editada
  const ModeloSelecionada = ref<number | null>(null);

  //Manutencoes a serem inseridos
  const manutencoesSelecionados = ref<number[]>([]);

  //Listar Manutenções e Modelos do banco
  const listarManutencoes = async () => {
    Manutencoes.value = await manutencaoController.listarManutencoes();
  }

  //Completa os modelos com a lista de Manutenções(tipos)
  const completarModelos = async () => {
  try {
    // Obtém a lista de manutenções
    const modelos = await modeloController.listarModelos();

    // Para cada manutenção, obtém os itens completos e mantém apenas a descrição
    for (const modelo of modelos) {

      const manutencoes = await modeloController.listarManutencoes(modelo.id);

      modelo.manutencoes = manutencoes.map((manutencao: { tipo: string; }) => manutencao.tipo);

    }

    // Atualiza a lista de manutenções
    Modelos.value = modelos
  } catch (error) {
    console.error("Erro ao completar manutenções:", error);
  }
  };

  //Quando ligar
  onMounted(() => {
    completarModelos();
    listarManutencoes();
    console.log(Modelos)
  })

  //Criar
  const criarModelo = () => {
    mode.value = new Modelo(0, '', '', []);
    dialog.value = true;
  }

  // Excluir
  const excluirModelo= async (Id: number) => {
    if (confirm('Tem certeza que deseja excluir este Modelo?')) {
      try {
        await modeloController.excluirModelo(Id);
        snackbarSuccess('Modelo excluído com sucesso!');
        await completarModelos();
      } catch (error) {
        console.error("Erro ao excluir Modelo:", error);
        snackbarError('Erro ao excluir Modelo.');
      }
    }
  };

  const salvarModelo = async () => {
    try{
      await modeloController.cadastrarModelo(mode.value);
      snackbarSuccess('Modelo Cadastrado');
      dialog.value = false;
    } catch (error) {
      console.error("Erro ao salvar Modelo:", error);
      snackbarError('Erro ao salvar Modelo.');
    }
    console.log("Manutencoes:", Manutencoes);
    console.log("Itens Selecionados:", manutencoesSelecionados);
  }

  //Preparação Pop-up
  const abrirDialogAdd = (Id: number) => {
    ModeloSelecionada.value = Id;
    manutencoesSelecionados.value = [];
    dialogAdd.value = true;
  }

  //Conexão Controller (adicionar Manutencao)
  const adicionarManutencao = async (Id: number, IdManutencao: number) => {
    await modeloController.adicionarManutencao(Id, IdManutencao);
  }

  //Adiciona Itens na Edição
  const addManutencoes = () => {
    if (!ModeloSelecionada.value) return;

    manutencoesSelecionados.value.forEach((IdManutencao) => {
      adicionarManutencao(ModeloSelecionada.value!, IdManutencao)
    });

    console.log(manutencoesSelecionados)
    dialogAdd.value = false;
  }


</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Modelos </span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="criarModelo">Novo Modelo</v-btn>
      </v-card-title>

      <!-- Tabela de Manutenções -->
      <v-data-table
        :headers="[
          { title: 'Id', key: 'id' },
          { title: 'Tipo', key: 'tipo' },
          { title: 'Marca', key: 'marca' },
          { title: 'Manutencoes', key: 'manutencoes' },
        ]"
        :items="Modelos"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.id }}  </td>
            <td>  {{ item.tipo }}  </td>
            <td>  {{ item.marca }} </td>
            <td>  {{ item.manutencoes.join(', ') }}  </td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="blue" size="small" @click="abrirDialogAdd(item.id)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirModelo(item.id!)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- Adicionar Manutencao (Botão)-->
      <v-dialog v-model="dialogAdd" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5"> Selecionar Manutencoes</span>
          </v-card-title>

          <v-card-text>
            <v-form>
              <!-- Seleção de Itens -->
              <v-select
                v-model="manutencoesSelecionados"
                :items="Manutencoes"
                item-title="tipo"
                item-value="id"
                label="Selecione as Manutencoes"
                multiple
                outlined
                class="mb-4"
              ></v-select>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="red" @click="dialogAdd = false">
              Cancelar
            </v-btn>
            <v-btn color="green" @click="addManutencoes">
              Adicionar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>

    <!-- Dialog de Criação -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Nova Modelo</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Tipo de Modelo -->
            <label class="required-label">Tipo</label>
            <v-text-field
              v-model="mode.tipo"
              type="text"
              label="Tipo de Modelo"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Id do Modelo -->
            <label class="required-label">Marca</label>
            <v-text-field
              v-model="mode.marca"
              type="text"
              label="Marca da Modelo"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Seleção Manutenções -->
            <v-select
              v-model="mode.manutencoes"
              :items="Manutencoes"
              item-title="tipo"
              item-value="id"
              label="Selecione as Manutencoes"
              multiple
              outlined
              class="mb-4"
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarModelo">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
