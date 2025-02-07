import type { BaseConfig } from "./BaseConfig";

class ManutencaoRoutes {
    protected config: BaseConfig;
    protected name: string;

    constructor(config: BaseConfig) {
        this.config = config;
        this.name = 'manutencao';
    };

    //ObterManutencao
    get entity(): string {
        return `${this.name}`;
    };

    //ExcluirManutencao
    get delete(): string {
        return `${this.name}/${this.config.id}`;
    };
};

export default ManutencaoRoutes;