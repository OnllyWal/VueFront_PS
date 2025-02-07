import type { IItem } from '@/model/Item';
import ItemRepository from '@/model/repositories/ItemRepository';

export default class ItemController {
  itemRepository;

    constructor() {
      this.itemRepository = new ItemRepository();
    }

  async getItens() {
    return await this.itemRepository.getItens();
  }

  async obterItem(Id: number) {
    return await this.itemRepository.obterItem(Id);
  }

  async cadastrarItem(form: IItem) {
    return await this.itemRepository.cadastrarItem(form);
  }

  async excluirItem(Id: number) {
    return await this.itemRepository.excluirItem(Id);
  }
}
