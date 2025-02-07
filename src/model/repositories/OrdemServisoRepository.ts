// src/repositories/ProductRepository.js
import api from '@/services/api';
import {type IOrdemServico } from '../OrdemServico';
import OrdemServicoRoutes from './apiRoutes/OrdemServicoRoutes';
import { Item, type IItem } from '../Item';

export default class OrdemServicoRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new OrdemServicoRoutes({}).entity;
  }

  createDeleteRoute() {
    return new OrdemServicoRoutes({}).delete;
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
  
  async adicionarItem(form: IItem) {
    try {
      const baseRoute = `${this.createBaseRoute()}/item`;

      const response = await this.apiClient.post(baseRoute, form);

      return response;
    } catch (error) {
      console.error("Erro ao adicionar item", error);
      throw error;
    }
  }

  async removerItem() {
    try {
      const baseRoute = `${this.createDeleteRoute()}/item`;

      const response = await this.apiClient.delete(baseRoute);

      return response;
    } catch (error) {
      console.error("Erro ao remover item", error);
      throw error;
    }
  }

  async listarItens() {
    try {
      const baseRoute = `${this.createBaseRoute()}/itens`;

      const response = await this.apiClient.get(baseRoute);
      
      return response.data.map((item: IItem) => new Item(item.Id, item.Tipo, item.unidadeDeMedida, item.descricao, item.quantidade));
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
      throw error;
    }
  }
}
