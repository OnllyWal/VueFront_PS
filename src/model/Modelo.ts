import {Manutencao} from './Manutencao';

export interface IModelo {
  Id: number;
  Tipo: string;
  Marca: string;
  Manutencoes: Manutencao[];
}

export class Modelo implements IModelo {
  Id: number;
  Tipo: string;
  Marca: string;
  Manutencoes: Manutencao[] = [];

  constructor(
    Id: number, 
    Tipo: string, 
    Marca: string,
    Manutencoes: Manutencao[] = []
  ){
    this.Id = Id;
    this.Tipo = Tipo;
    this.Marca = Marca;
    this.Manutencoes = Manutencoes;
  }
}