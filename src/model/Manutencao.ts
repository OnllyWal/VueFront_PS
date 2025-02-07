import {Item} from './Item';

export interface IManutencao {
  Id: number;
  Tipo: string;
  Recorrencia: number;
  Status: string;
  Itens: Item[];
}

export class Manutencao implements IManutencao {
  Id: number;
  Tipo: string;
  Recorrencia: number;
  Status: string;
  Itens: Item[] = [];

  public constructor(
    Id: number,
    Tipo: string,
    Recorrencia: number,
    Status: string,
    Itens: Item[] = []
  ){
    this.Id = Id;
    this.Tipo = Tipo;
    this.Recorrencia = Recorrencia;
    this.Status = Status;
    this.Itens = Itens;
}
}
