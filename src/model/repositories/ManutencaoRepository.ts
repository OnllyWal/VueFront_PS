// src/repositories/ProductRepository.js
import api from '@/services/api';
import type { IManutencao } from '../Manutencao';
import { Manutencao } from '../Manutencao';
import ManutencaoRoutes from './apiRoutes/ManutencaoRoutes';

export default class ManutencaoRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new ManutencaoRoutes({}).entity;
  }

  createDeleteRoute(id: number) {
    return new ManutencaoRoutes({id: id}).delete;
  }

  async obterManutencao(Id: number) {
      try {
          const baseRoute = `${this.createBaseRoute()}/${Id}`;
  
          const response = await this.apiClient.get(baseRoute);
  
          return new Manutencao(response.data.Id, response.data.Tipo, response.data.Recorrencia, response.data.Status, response.data.Itens);
        } catch (error) {
        console.error("Erro ao buscar Manutencao", error);
        throw error;
      }
    }
  
    async cadastrarManutencao(form: IManutencao) {
        try {
            const baseRoute = this.createBaseRoute();
    
            const response = await this.apiClient.post(baseRoute, form);
    
            return response;
        } catch (error) {
          console.error("Erro ao criar Manutencao", error);
          throw error;
        }
      }
    
    async excluirManutencao(Id: number) {
      try {
        const deleteRoute = this.createDeleteRoute(Id);
  
        const response = await this.apiClient.delete(deleteRoute);
  
        return response;
      } catch (error) {
        console.error("Erro ao deletar manutencao", error);
        throw error;
      }
    }

    async adicionarItem(Id: number, IdItem: number) {
      try {
        const baseRoute = `${this.createBaseRoute()}/${Id}/item`;

        const response = await this.apiClient.post(baseRoute, IdItem);

        return response;
      } catch (error) {
        console.error("Erro ao adicionar Item", error);
        throw error;
      }
    }

    async removerItem(Id:number, IdItem:number) {
      try {
        const deleteRoute = `${this.createDeleteRoute(Id)}/item/${IdItem}}`;

        const response = await this.apiClient.delete(deleteRoute);

        return response;
      } catch (error) {
        console.error("Erro ao excluir Item", error);
        throw error;
      }
    }
}
