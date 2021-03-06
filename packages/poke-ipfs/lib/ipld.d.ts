/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import { IPokeReturnBase, IPokeOptions } from './types';
export declare function pokeIPLD(cid: ICIDValue, options?: IPokeOptions): Promise<(Pick<IPokeReturnBase, "error" | "headers" | "status" | "statusText"> & {
    value: true;
}) | (Pick<IPokeReturnBase, "error" | "headers" | "status" | "statusText"> & {
    value: false;
}) | (Pick<IPokeReturnBase, "headers" | "value" | "status" | "statusText"> & {
    error: Error;
})>;
export default pokeIPLD;
