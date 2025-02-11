<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import OrdemServicoController from '@/controller/OrdemServicoController';
  import { type IOrdemServico, OrdemServico } from '@/model/OrdemServico';
  import { type IItem } from '@/model/Item';
  import ItemController from '@/controller/ItemController';
  import { type IEquipamento } from '@/model/Equipamento';
  import EquipamentoController from '@/controller/EquipamentoController';

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
  const itemController = new ItemController();
  const ordemServicoController = new OrdemServicoController();

  //Listas
  const Ordens = ref<IOrdemServico[]>([]);
  const Itens = ref<IItem[]>([]);
  const Equipamentos = ref<IEquipamento[]>([]);

  //pop-ups(input)
  const dialog = ref(false)         //Criação

  //Objeto Manutencão vazio
  const ord = ref<IOrdemServico>( new OrdemServico(0,0, '', new Date(), new Date(),0, []));

  //Listar Ordens e Itens do banco
  const listarItens = async () => {
    Itens.value = await itemController.getItens();
  }

  const listarEquipamentos = async () => {
    Equipamentos.value = await equipamentoController.listarEquipamentos();
  }

  //Completa Manutenções com a lista de itens(descrição)
  const completarOrdens= async () => {
  try {
    // Obtém a lista de manutenções
    const ordens = await ordemServicoController.listOrdens();

    // Para cada manutenção, obtém os itens completos e mantém apenas a descrição
    for (const ordem of ordens) {
      const ordemcompleta = await ordemServicoController.getOrdem(ordem.id);

      // Substitui a lista de itens por uma lista contendo apenas as descrições
      ordem.itens = ordemcompleta.itens.map((item: { descricao: string; }) => item.descricao);
    }

    // Atualiza a lista de manutenções
    Ordens.value = ordens;
  } catch (error) {
    console.error("Erro ao completar manutenções:", error);
  }
  };

  //Quando ligar
  onMounted(() => {
    completarOrdens();
    listarItens();
    listarEquipamentos();
    console.log(Ordens)
  })

  //Criar
  const criarOrdemServico = () => {
    ord.value = new OrdemServico(0,0, '', new Date(), new Date(),0, []);
    dialog.value = true;
  }

  // Excluir
  const fecharOrdemServico= async (Id: number) => {
    if (confirm('Tem certeza que deseja excluir este OrdemServico?')) {
      try {
        await ordemServicoController.fechar(Id);
        snackbarSuccess('OrdemServico excluído com sucesso!');
        await completarOrdens();
      } catch (error) {
        console.error("Erro ao excluir OrdemServico:", error);
        snackbarError('Erro ao excluir OrdemServico.');
      }
    }
  };

  const abrirOrdemServico = async () => {
    try{
      await ordemServicoController.abrir(ord.value);
      snackbarSuccess('OrdemServico Cadastrado');
      dialog.value = false;
    } catch (error) {
      console.error("Erro ao salvar OrdemServico:", error);
      snackbarError('Erro ao salvar OrdemServico.');
    }
    console.log("Itens:", Itens);
  }

  const formatData = (dataISO: string | Date) => {
  const data = new Date(dataISO);
  return data.toISOString().split('T')[0]; // Retorna a parte YYYY-MM-DD
};


</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">OrdemServicos </span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="criarOrdemServico">Novo OrdemServico</v-btn>
      </v-card-title>

      <!-- Tabela de Manutenções -->
      <v-data-table
        :headers="[
          { title: 'Id', key: 'id' },
          { title: 'IdEquipamento', key: 'idEquipamento' },
          { title: 'Status', key: 'status' },
          { title: 'Data Abertura', key: 'dataAbertura' },
          { title: 'Data Finalização', key: 'dataFinalizacao' },
          { title: 'IdManutencao', key: 'idManutencao' },
          { title: 'Itens', key: 'itens' },
        ]"
        :items="Ordens"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.id }}  </td>
            <td>  {{ item.idEquipamento }}  </td>
            <td>  {{ item.status }} </td>
            <td>  {{ formatData(item.dataAbertura) }}  </td>
            <td>  {{ formatData(item.dataFinalizacao)}}  </td>
            <td>  {{ item.idManutencao }}  </td>
            <td>  {{ item.itens.join(', ') }}  </td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="red" size="small" @click="fecharOrdemServico(item.id!)">
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
          <span class="text-h5">Nova OrdemServico</span>
        </v-card-title>

        <v-card-text>
          <v-form>

            <!-- Selecionar Equipamento-->
            <label class="required-label">Equipamento</label>
            <v-select
              v-model="ord.idEquipamento"
              :items="Equipamentos"
              item-title="tipo"
              item-value="id"
              label="Selecione o Equipamento"
              outlined
              class="mb-4"
            ></v-select>

            <!-- status de OrdemServico -->
            <label class="required-label">Status</label>
            <v-text-field
              v-model="ord.status"
              type="text"
              label="Status da OrdemServico"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Id do Modelo -->
            <label class="required-label">IdManutencao</label>
            <v-text-field
              v-model="ord.idManutencao"
              type="number"
              label="Status da OrdemServico"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Seleção Itens -->
            <label class="required-label">Itens</label>
            <v-select
              v-model="ord.itens"
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
          <v-btn color="green" @click="abrirOrdemServico">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
