// src/repositories/ProductRepository.js
import api from '@/services/api';
import { Modelo, type IModelo } from '../Modelo';
import ModeloRoutes from './apiRoutes/ModeloRoutes';
import { Manutencao, type IManutencao } from '../Manutencao';

export default class ModeloRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new ModeloRoutes({}).entity;
  }

  createDeleteRoute(id: number) {
    return new ModeloRoutes({id: id}).delete;
  }

  async obterModelo(Id: number) {
      try {
          const baseRoute = `${this.createBaseRoute()}/${Id}`;

          const response = await this.apiClient.get(baseRoute);

          return new Modelo(response.data.id, response.data.tipo, response.data.marca, response.data.manutencoes);
        } catch (error) {
        console.error("Erro ao buscar Modelo", error);
        throw error;
      }
    }

  async listarModelos() {
    try {
      const baseRoute = this.createBaseRoute();

      const response = await this.apiClient.get(baseRoute);

      return response.data.map((modelo: IModelo) => new Modelo(modelo.id, modelo.tipo, modelo.marca, modelo.manutencoes));
    } catch (error) {
      console.error("Erro ao buscar Itens", error);
      throw error
    }
  }

  async cadastrarModelo(form: IModelo) {
    try {
      const baseRoute = this.createBaseRoute();

      const response = await this.apiClient.post(baseRoute, form);

      return response;
    } catch (error) {
      console.error("Erro ao criar Modelo", error);
      throw error;
    }
  }

  async excluirModelo(Id: number) {
    try {
      const deleteRoute = this.createDeleteRoute(Id);

      const response = await this.apiClient.delete(deleteRoute);

      return response;
    } catch (error) {
      console.error("Erro ao deletar Modelo", error);
      throw error;
    }
  }

  async listarManutencoes(Id: number) {
    try {
        const baseRoute = `${this.createBaseRoute()}/${Id}/manutencoes`;

        const response = await this.apiClient.get(baseRoute);

        return response.data.map((manutencao: IManutencao) => new Manutencao(manutencao.id, manutencao.tipo, manutencao.recorrencia, manutencao.status, manutencao.itens));
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
      throw error;
    }
  }

  async adicionarManutencao(Id: number, IdManutencao: number) {
    try {
      const baseRoute = `${this.createBaseRoute()}/${Id}/${IdManutencao}`

      const response = await this.apiClient.post(baseRoute, IdManutencao)
      return response;
    } catch (error) {
      console.error("Erro ao adicionar manutencao", error);
      throw error;
    }
  }
}
