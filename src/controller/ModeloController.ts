import type { IModelo } from '@/model/Modelo';
import ModeloRepository from '@/model/repositories/ModeloRepository';

export default class ModeloController {
  ModeloRepository;
  constructor() {
    this.ModeloRepository = new ModeloRepository();
  }

  async getModelo(Id: number) {
    return await this.ModeloRepository.obterModelo(Id);
  }

  async listarModelos() {
    return await this.ModeloRepository.listarModelos();
  }

  async cadastrarModelo(form: IModelo) {
    return await this.ModeloRepository.cadastrarModelo(form);
  }

  async excluirModelo(Id: number) {
    return await this.ModeloRepository.excluirModelo(Id);
  }

  async listarManutencoes(Id: number) {
    return await this.ModeloRepository.listarManutencoes(Id);
  }
  async adicionarManutencao(Id: number, IdManutencao: number) {
    return await this.ModeloRepository.adicionarManutencao(Id, IdManutencao);
  }
}
