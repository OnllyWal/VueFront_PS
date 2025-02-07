import type { BaseConfig } from "./BaseConfig";

class ModeloRoutes {
    protected config: BaseConfig;
    protected name: string;

    constructor(config: BaseConfig) {
        this.config = config;
        this.name = 'modelo';
    };

    //ObterModelo
    get entity(): string {
        return `${this.name}`;
    };

    //ExcluirModelo
    get delete(): string {
        return `${this.name}/${this.config.id}`;
    };
};

export default ModeloRoutes;