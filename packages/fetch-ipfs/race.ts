/**
 * Created by user on 2020/3/22.
 */
import { IIPFSPromiseApi } from 'ipfs-types';
import pAny from 'p-any';
import ipfsClient, { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { handleCID, fetchIPFSCore, handleTimeout } from './index';
import { ITSValueOrArray } from 'ts-type';
import Bluebird from 'bluebird';
import { checkIPFS } from 'ipfs-util-lib';

export function raceFetchIPFS(cid: string, useIPFS: ITSValueOrArray<(string | IIPFSPromiseApi | IIPFSClientAddresses)>, timeout?: number)
{
	const cid2 = handleCID(cid, true);
	timeout = handleTimeout(timeout);

	if (!Array.isArray(useIPFS))
	{
		useIPFS = [useIPFS];
	}

	return Bluebird
		.map<any, IIPFSPromiseApi>(useIPFS, (ipfs) => {
			if (!ipfs)
			{
				return
			}
			else if (typeof ipfs === 'string')
			{
				return ipfsClient(ipfs)
			}
			// @ts-ignore
			else if (typeof ipfs === 'object' && typeof ipfs.cat !== 'undefined')
			{
				if (!Object.keys(ipfs).length)
				{
					return
				}

				return ipfsClient(ipfs as IIPFSClientAddresses)
			}
			else if (ipfs)
			{
				return ipfs
			}
		})
		.filter(ipfs => {
			return checkIPFS(ipfs).catch(e => false)
		})
		.then(ps => {

			const ls = ps.map(ipfs => {
				return fetchIPFSCore(cid2, ipfs, timeout)
			})

			ls.push(fetchIPFSCore(cid, null, timeout));

			return pAny(ls, {
				filter(buf)
				{
					return buf?.length > 0
				}
			})
		})
	;
}

export default raceFetchIPFS
