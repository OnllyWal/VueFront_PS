import { Item } from './Item'; // Certifique-se de importar a classe Item corretamente

export interface IOrdemServico {
  Id: number;
  idEquipamento: number;
  status: string;
  dataAbertura: Date;
  dataFinalizacao: Date;
  idManutencao: number;
  Itens: Item[];
}

export class OrdemServico {
  Id: number;
  idEquipamento: number;
  status: string;
  dataAbertura: Date;
  dataFinalizacao: Date;
  idManutencao: number;
  Itens: Item[] = []; // Inicializando como um array vazio

  constructor(
    Id: number,
    idEquipamento: number,
    status: string,
    dataAbertura: Date,
    dataFinalizacao: Date,
    idManutencao: number,
    Itens: Item[] = []
  ){
    this.Id = Id;
    this.idEquipamento = idEquipamento;
    this.status = status;
    this.dataAbertura = dataAbertura;
    this.dataFinalizacao = dataFinalizacao;
    this.idManutencao = idManutencao;
    this.Itens = Itens;
  }
}