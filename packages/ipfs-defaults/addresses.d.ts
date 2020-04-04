/**
 * Created by user on 2020/4/4.
 */
export declare type IPort = number | string;
export declare type IType = 'js' | 'go';
export declare function getDefaultAddressesPorts(ports?: {
    Swarm?: IPort;
    API?: IPort;
    Gateway?: IPort;
}, type?: IType | string): {
    Swarm: IPort;
    API: IPort;
    Gateway: IPort;
};
export declare function createDefaultAddresses(ports?: {
    Swarm?: IPort;
    API?: IPort;
    Gateway?: IPort;
}, type?: IType | string): {
    Swarm: string[];
    API: string;
    Gateway: string;
};
export default createDefaultAddresses;
