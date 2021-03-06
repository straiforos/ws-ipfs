export interface IIPFSOptions {
    init?: boolean;
    start?: boolean;
    EXPERIMENTAL?: any;
    repo?: string;
    config?: any;
}
export declare type IApiOptions<T = {}> = T & INetworkOptionsBase;
export interface INetworkOptionsBase {
    timeout?: number | string;
    signal?: any;
}
