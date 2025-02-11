import type { BaseConfig } from "./BaseConfig";

class OrdemServicoRoutes {
    protected config: BaseConfig;
    protected name: string;

    constructor(config: BaseConfig) {
        this.config = config;
        this.name = 'OrdemServico';
    };

    //AbrirOrdemServico
    get entity(): string {
        return `${this.name}`;
    };
};

export default OrdemServicoRoutes;
