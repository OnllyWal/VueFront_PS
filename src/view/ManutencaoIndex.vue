<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ManutencaoController from '@/controller/ManutencaoController';
  import { type IManutencao, Manutencao } from '@/model/Manutencao';
  import { type IItem } from '@/model/Item';
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

  //pop-ups(input)
  const dialog = ref(false)         //Criação
  const dialogAdd = ref(false)      // Edição

  //Objeto Manutencão vazio
  const manu = ref<IManutencao>( new Manutencao(0,'', 0, '', []));

  //Id de ObjManutencao a ser editada
  const ManutencaoSelecionada = ref<number | null>(null);

  //Itens a serem inseridos
  const itensSelecionados = ref<number[]>([]);

  //Listar Manutenções e Itens do banco
  const listarItens = async () => {
    Itens.value = await itemController.getItens();
  }

  //Completa Manutenções com a lista de itens(descrição)
  const completarManutencoes = async () => {
  try {
    // Obtém a lista de manutenções
    const manutencoes = await manutencaoController.listarManutencoes();

    // Para cada manutenção, obtém os itens completos e mantém apenas a descrição
    for (const manutencao of manutencoes) {
      const manutencaoCompleta = await manutencaoController.obterManutencao(manutencao.id);

      // Substitui a lista de itens por uma lista contendo apenas as descrições
      manutencao.itens = manutencaoCompleta.itens.map(item => item.descricao);
    }

    // Atualiza a lista de manutenções
    Manutencoes.value = manutencoes;
  } catch (error) {
    console.error("Erro ao completar manutenções:", error);
  }
  };

  //Quando ligar
  onMounted(() => {
    completarManutencoes();
    listarItens();
    console.log(Manutencoes)
  })

  //Criar
  const criarManutencao = () => {
    manu.value = new Manutencao(0, '', 0, '', []);
    dialog.value = true;
  }

  // Excluir
  const excluirManutencao= async (Id: number) => {
    if (confirm('Tem certeza que deseja excluir este Manutencao?')) {
      try {
        await manutencaoController.excluirManutencao(Id);
        snackbarSuccess('Manutencao excluído com sucesso!');
        await completarManutencoes();
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
    } catch (error) {
      console.error("Erro ao salvar Manutencao:", error);
      snackbarError('Erro ao salvar Manutencao.');
    }
    console.log("Itens:", Itens);
    console.log("Itens Selecionados:", itensSelecionados);
  }

  //Preparação Pop-up
  const abrirDialogAdd = (Id: number) => {
    ManutencaoSelecionada.value = Id;
    itensSelecionados.value = [];
    dialogAdd.value = true;
  }

  //Conexão Controller (adicionar Item)
  const adicionarItem = async (Id: number, IdItem: number) => {
    await manutencaoController.adicionarItem(Id, IdItem);
  }

  //Adiciona Itens na Edição
  const addItens = () => {
    if (!ManutencaoSelecionada.value) return;

    itensSelecionados.value.forEach((IdItem) => {
      adicionarItem(ManutencaoSelecionada.value!, IdItem)
    });

    console.log(itensSelecionados)
    dialogAdd.value = false;
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
          { title: 'Id', key: 'id' },
          { title: 'Tipo', key: 'tipo' },
          { title: 'Recorrência', key: 'recorrencia' },
          { title: 'Status', key: 'status' },
          { title: 'Itens', key: 'itens' },
        ]"
        :items="Manutencoes"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.id }}  </td>
            <td>  {{ item.tipo }}  </td>
            <td>  {{ item.recorrencia }} </td>
            <td>  {{ item.status }}  </td>
            <td>  {{ item.itens.join(', ') }}  </td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="blue" size="small" @click="abrirDialogAdd(item.id)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirManutencao(item.id!)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- Adicionar Item (Botão)-->
      <v-dialog v-model="dialogAdd" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5"> Selecionar Itens</span>
          </v-card-title>

          <v-card-text>
            <v-form>
              <!-- Seleção de Itens -->
              <v-select
                v-model="itensSelecionados"
                :items="Itens"
                item-title="descricao"
                item-value="id"
                label="Selecione os Itens"
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
            <v-btn color="green" @click="addItens">
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
          <span class="text-h5">Nova Manutencao</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Tipo de Manutencao -->
            <label class="required-label">Tipo</label>
            <v-text-field
              v-model="manu.tipo"
              type="text"
              label="Tipo de Manutencao"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Id do Modelo -->
            <label class="required-label">Status</label>
            <v-text-field
              v-model="manu.status"
              type="text"
              label="Status da Manutencao"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Horimetro ou Odometro -->
            <label class="required-label">Recorrencia</label>
            <v-text-field
              v-model="manu.recorrencia"
              type="number"
              label="Recorrencia da Manutencao"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Seleção Itens -->
            <v-select
              v-model="manu.itens"
              :items="Itens"
              item-title="descricao"
              item-value="id"
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
