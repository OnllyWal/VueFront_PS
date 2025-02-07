export interface IEquipamento {
    Id: number;
    Tipo: string;
    IdModelo: number;
    HorimetroOuOdometro: number;
}

export class Equipamento implements IEquipamento {
    public constructor (
      public Id: number, 
      public Tipo: string, 
      public IdModelo: number, 
      public HorimetroOuOdometro: number
    ){
      this.Id = Id;
      this.Tipo = Tipo;
      this.IdModelo = IdModelo;
      this.HorimetroOuOdometro = HorimetroOuOdometro;
    }
}