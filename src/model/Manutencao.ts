import {Item} from './Item';

export interface IManutencao {
  id: number;
  tipo: string;
  recorrencia: number;
  status: string;
  itens: Item[];
}

export class Manutencao implements IManutencao {
  id: number;
  tipo: string;
  recorrencia: number;
  status: string;
  itens: Item[] = [];

  public constructor(
    id: number,
    tipo: string,
    recorrencia: number,
    status: string,
    itens: Item[] = []
  ){
    this.id = id;
    this.tipo = tipo;
    this.recorrencia = recorrencia;
    this.status = status;
    this.itens = itens;
}
}
