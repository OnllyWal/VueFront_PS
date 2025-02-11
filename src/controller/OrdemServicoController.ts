import type { IOrdemServico} from '@/model/OrdemServico';
import OrdemServicoRepository from '@/model/repositories/OrdemServicoRepository';

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

  async getOrdem(Id: number) {
    return await this.OrdemServicoRepository.getOrdem(Id);
  }

  async listOrdens() {
    return await this.OrdemServicoRepository.listOrdens();
  }
}