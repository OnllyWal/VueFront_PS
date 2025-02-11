import type { IManutencao } from '@/model/Manutencao';
import ManutencaoRepository from '@/model/repositories/ManutencaoRepository';

export default class ManutencaoController {
  ManutencaoRepository;
  constructor() {
    this.ManutencaoRepository = new ManutencaoRepository();
  }

  async obterManutencao(Id: number) {
    return await this.ManutencaoRepository.obterManutencao(Id);
  }

  async listarManutencoes() {
    return await this.ManutencaoRepository.listarManutencoes();
  }

  async cadastrarManutencao(form : IManutencao) {
    return await this.ManutencaoRepository.cadastrarManutencao(form);
  }

  async excluirManutencao(Id: number) {
    return await this.ManutencaoRepository.excluirManutencao(Id);
  }

  async adicionarItem(Id : number, IdItem: number) {
    return await this.ManutencaoRepository.adicionarItem(Id, IdItem);
  }

  async removerItem(Id: number, IdItem: number) {
    return await this.ManutencaoRepository.removerItem(Id, IdItem);
  }
}
