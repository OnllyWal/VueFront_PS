// src/repositories/ProductRepository.js
import api from '@/services/api';
import {type IOrdemServico, OrdemServico } from '../OrdemServico';
import OrdemServicoRoutes from './apiRoutes/OrdemServicoRoutes';

export default class OrdemServicoRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new OrdemServicoRoutes({}).entity;
  }
  
  async abrir(form: IOrdemServico) {
    try {
        const baseRoute = `${this.createBaseRoute()}/abrir`;

        const response = await this.apiClient.post(baseRoute, form);

      return response;
      } catch (error) {
      console.error("Erro ao abrir OrdemServico", error);
      throw error;
    }
  }

  async fechar(Id: number) {
    try {
      const baseRoute = `${this.createBaseRoute()}/fechar`;

      const response = await this.apiClient.post(baseRoute, Id);

      return response;
    } catch (error) {
      console.error("Erro ao fechar OrdemServico", error);
      throw error;
    }
  }

  async getOrdem(Id: number) {
    try {
      const baseRoute = `${this.createBaseRoute()}/${Id}`;

      const response = await this.apiClient.get(baseRoute);

      return new OrdemServico(response.data.id,
        response.data.idEquipamento,
        response.data.status,
        response.data.dataAbertura,
        response.data.dataFinalizacao,
        response.data.idManutencao,
        response.data.itens);
    } catch (error) {
      console.error("Erro ao get Ordem", error);
      throw error;
    }
  }

  async listOrdens() {
    try {
      const baseRoute = this.createBaseRoute();

      const response = await this.apiClient.get(baseRoute);

      return response.data.map((ordem: IOrdemServico) =>
        new OrdemServico(ordem.id,
                        ordem.idEquipamento,
                        ordem.status,
                        ordem.dataAbertura,
                        ordem.dataFinalizacao,
                        ordem.idManutencao,
                        ordem.itens));
    } catch (error) {
      console.error("Erro ao remover item", error);
      throw error;
    }
  }
}
