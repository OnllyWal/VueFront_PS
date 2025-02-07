export interface IItem {
  Id: number;
  Tipo: string;
  unidadeDeMedida: number;
  descricao: string;
  quantidade: number;
}

export class Item implements IItem {
  public constructor (
    public Id: number,
    public Tipo: string,
    public unidadeDeMedida: number,
    public descricao: string,
    public quantidade: number
  ){
    this.Id = Id;
    this.Tipo = Tipo;
    this.unidadeDeMedida = unidadeDeMedida;
    this.descricao = descricao;
    this.quantidade = quantidade;
    }
}
