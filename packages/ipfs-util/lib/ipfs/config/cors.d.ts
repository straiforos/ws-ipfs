import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
export declare function _setIfNotExists(ipfs: IIPFSConfigApi, key: any, value: any): Promise<boolean>;
export declare function configApiCors(ipfs: IIPFSConfigApi): Promise<boolean[]>;
export default configApiCors;
