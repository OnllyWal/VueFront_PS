import type { BaseConfig } from "./BaseConfig";

class EquipamentoRoutes {
    protected config: BaseConfig;
    protected name: string;

    constructor(config: BaseConfig) {
        this.config = config;
        this.name = 'equipamento';
    };

    //GetEquipamento
    get entity(): string {
        return `${this.name}`;
    };

    //ExcluirEquipamento
    get delete(): string {
        return `${this.name}/${this.config.id}`;
    };
};

export default EquipamentoRoutes;
