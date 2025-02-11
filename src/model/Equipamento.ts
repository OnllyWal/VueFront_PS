export interface IEquipamento {
    id: number;
    tipo: string;
    idModelo: number;
    horimetroOuOdometro: number;
}

export class Equipamento implements IEquipamento {
    public constructor (
      public id: number,
      public tipo: string,
      public idModelo: number,
      public horimetroOuOdometro: number
    ){
      this.id = id;
      this.tipo = tipo;
      this.idModelo = idModelo;
      this.horimetroOuOdometro = horimetroOuOdometro;
    }
}
