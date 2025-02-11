export interface IItem {
  id: number;
  tipo: string;
  unidadeDeMedida: number;
  descricao: string;
  quantidade: number;
}

export class Item implements IItem {
  public constructor (
    public id: number,
    public tipo: string,
    public unidadeDeMedida: number,
    public descricao: string,
    public quantidade: number
  ){
    this.id = id;
    this.tipo = tipo;
    this.unidadeDeMedida = unidadeDeMedida;
    this.descricao = descricao;
    this.quantidade = quantidade;
    }
}
