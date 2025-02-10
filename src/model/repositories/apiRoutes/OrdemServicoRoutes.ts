import type { BaseConfig } from "./BaseConfig";

class OrdemServicoRoutes {
    protected config: BaseConfig;
    protected name: string;

    constructor(config: BaseConfig) {
        this.config = config;
        this.name = 'ordemservico';
    };

    //AbrirOrdemServico
    get entity(): string {
        return `${this.name}`;
    };

    //RemoverItem
    get delete(): string {
        return `${this.name}/item`;
    };
};

export default OrdemServicoRoutes;
