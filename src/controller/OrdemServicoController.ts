import type { IOrdemServico} from '@/model/OrdemServico';
import OrdemServicoRepository from '@/model/repositories/OrdemServicoRepository';
import type { IItem } from '@/model/Item';

export default class OrdemServicoController {
  OrdemServicoRepository;
  constructor() {
    this.OrdemServicoRepository = new OrdemServicoRepository();
  }

  async fechar(Id: number) {
    return await this.OrdemServicoRepository.fechar(Id);
  }

  async abrir(form: IOrdemServico) {
    return await this.OrdemServicoRepository.abrir(form);
  }

  async adicionarItem(form: IItem) {
    return await this.OrdemServicoRepository.adicionarItem(form);
  }

  async removerItem() {
    return await this.OrdemServicoRepository.removerItem();
  }
  async listarItens() {
    return await this.OrdemServicoRepository.listarItens();
  }
}
