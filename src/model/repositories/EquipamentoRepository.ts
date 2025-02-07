// src/repositories/ProductRepository.js
import api from '@/services/api';
import type { IEquipamento } from '../Equipamento';
import { Equipamento } from '../Equipamento';
import EquipamentoRoutes from './apiRoutes/EquipamentoRoutes';

export default class EquipamentoRepository {
  apiClient;

  constructor() {
    this.apiClient = api;
  }

  //Método para criar base de rota
  createBaseRoute() {
    return new EquipamentoRoutes({}).entity;
  }

  //Método para criar rota de exclusão
  createDeleteRoute(id: number) {
    return new EquipamentoRoutes({id: id}).delete;
  }

  //Método para pegar equipamento por id
  async getEquipamento(Id: number){
    try {
      const baseRoute = `${this.createBaseRoute()}/${Id}`;

      const response = await this.apiClient.get(baseRoute);

      return new Equipamento(response.data.Id, response.data.Tipo, response.data.IdModelo, response.data.HorimetroOuOdometro);
    } catch (error) {
      console.error(`Erro ao buscar equipamento com ID ${Id}`, error);
      throw error;
    }
  }

  //Método para listar Equipamentos
  async listarEquipamentos() {
    try {
        const baseRoute = this.createBaseRoute();

        const response = await this.apiClient.get(baseRoute);
        
        return response.data.map((equipamento: IEquipamento) => new Equipamento(equipamento.Id, equipamento.Tipo, equipamento.IdModelo, equipamento.HorimetroOuOdometro));
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
      throw error;
    }
  }

  async cadastrarEquipamento(form: IEquipamento) {
    try {
        const baseRoute = this.createBaseRoute();

        const response = await this.apiClient.post(baseRoute, form);

        return response;
    } catch (error) {
      console.error("Erro ao criar equipamento", error);
      throw error;
    }
  }

  async excluirEquipamento(Id: number) {
    try {
      const deleteRoute = this.createDeleteRoute(Id);

      const response = await this.apiClient.delete(deleteRoute);

      return response;
    } catch (error) {
      console.error("Erro ao deletar equipamento", error);
      throw error;
    }
  }

  async atualizarHorimetro(Id: number, data: number) {
    try {
      const updatedata = `${this.createBaseRoute()}/${Id}/horimetro-ou-odometro`;

      const response = await this.apiClient.post(updatedata, {data});

      return response;
    } catch (error) {
      console.error("Erro ao atualizar horimetro ou odometro", error);
      throw error;
    }
  }

  async listManutencoes(Id: number){
    try {
      const listManutencoesRoute = `${this.createBaseRoute()}/${Id}/manutencoes`;

      const response = await this.apiClient.get(listManutencoesRoute);

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar manutenções do equipamento", error);
      throw error;
    }
  }
  
}
