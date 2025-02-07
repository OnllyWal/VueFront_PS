import type { BaseConfig } from "./BaseConfig";

class ItemRoutes {
    protected config: BaseConfig;
    protected name: string;

    constructor(config: BaseConfig) {
        this.config = config;
        this.name = 'item';
    };

    //ObterItem
    get entity(): string {
        return `${this.name}`;
    };

    //ExcluirItem
    get delete(): string {
        return `${this.name}/${this.config.id}`;
    };
};

export default ItemRoutes;