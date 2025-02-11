import { Item } from './Item'; // Certifique-se de importar a classe Item corretamente

export interface IOrdemServico {
  id: number;
  idEquipamento: number;
  status: string;
  dataAbertura: Date;
  dataFinalizacao: Date;
  idManutencao: number;
  itens: Item[];
}

export class OrdemServico {
  id: number;
  idEquipamento: number;
  status: string;
  dataAbertura: Date;
  dataFinalizacao: Date;
  idManutencao: number;
  itens: Item[] = []; // Inicializando como um array vazio

  constructor(
    id: number,
    idEquipamento: number,
    status: string,
    dataAbertura: Date,
    dataFinalizacao: Date,
    idManutencao: number,
    itens: Item[] = []
  ){
    this.id = id;
    this.idEquipamento = idEquipamento;
    this.status = status;
    this.dataAbertura = dataAbertura;
    this.dataFinalizacao = dataFinalizacao;
    this.idManutencao = idManutencao;
    this.itens = itens;
  }
}