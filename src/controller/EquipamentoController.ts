import type { IEquipamento } from '@/model/Equipamento';
import EquipamentoRepository from '@/model/repositories/EquipamentoRepository';

export default class EquipamentoController {
  EquipamentoRepository;
  constructor() {
    this.EquipamentoRepository = new EquipamentoRepository();
  }

  async getEquipamento(Id: number) {
    return await this.EquipamentoRepository.getEquipamento(Id);
  }

  async listarEquipamentos() {
    return await this.EquipamentoRepository.listarEquipamentos();
  }

  async cadastrarEquipamento(form: IEquipamento) {
    return await this.EquipamentoRepository.cadastrarEquipamento(form);
  }

  async excluirEquipamento(Id: number) {
    return await this.EquipamentoRepository.excluirEquipamento(Id);
  }

  async atualizarHorimetro(Id: number, data: number) {
    return await this.EquipamentoRepository.atualizarHorimetro(Id, data);
  }
  async listManutencoes(Id: number) {
    return await this.EquipamentoRepository.listManutencoes(Id);
  }
}
