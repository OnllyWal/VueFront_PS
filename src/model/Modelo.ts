import {Manutencao} from './Manutencao';

export interface IModelo {
  id: number;
  tipo: string;
  marca: string;
  manutencoes: Manutencao[];
}

export class Modelo implements IModelo {
  id: number;
  tipo: string;
  marca: string;
  manutencoes: Manutencao[] = [];

  constructor(
    id: number,
    tipo: string,
    marca: string,
    manutencoes: Manutencao[] = []
  ){
    this.id = id;
    this.tipo = tipo;
    this.marca = marca;
    this.manutencoes = manutencoes;
  }
}
