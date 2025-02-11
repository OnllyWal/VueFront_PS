// src/repositories/ProductRepository.js
import api from '@/services/api';
import type { IItem } from '../Item';
import { Item } from '../Item';
import ItemRoutes from './apiRoutes/ItemRoutes';

export default class ItemRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new ItemRoutes({}).entity;
  }

  createDeleteRoute(id: number) {
    return new ItemRoutes({id: id}).delete;
  }

  async obterItem(Id: number) {
    try {
        const baseRoute = `${this.createBaseRoute()}/${Id}`;

        const response = await this.apiClient.get(baseRoute);

        return new Item(response.data.id, response.data.tipo, response.data.unidadeDeMedida, response.data.descricao, response.data.quantidade);
      } catch (error) {
      console.error("Erro ao buscar Item", error);
      throw error;
    }
  }

  async getItens() {
    try {
        const baseRoute = this.createBaseRoute();

        const response = await this.apiClient.get(baseRoute);

        return response.data.map((item: IItem) => new Item(item.id, item.tipo, item.unidadeDeMedida, item.descricao, item.quantidade));
    } catch (error) {
      console.error("Erro ao buscar Itens", error);
      throw error
    }
  }

  async cadastrarItem(form: IItem) {
      try {
          const baseRoute = this.createBaseRoute();

          const response = await this.apiClient.post(baseRoute, form);

          return response;
      } catch (error) {
        console.error("Erro ao criar item", error);
        throw error;
      }
    }

  async excluirItem(Id: number) {
    try {
      const deleteRoute = this.createDeleteRoute(Id);

      const response = await this.apiClient.delete(deleteRoute);

      return response;
    } catch (error) {
      console.error("Erro ao deletar item", error);
      throw error;
    }
  }
}
