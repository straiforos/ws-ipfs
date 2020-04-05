import { IIPFSClientAddresses } from './lib/types';
import ipfsEnv from 'ipfs-env';

export function getDefaultServerList(options: {
	urlObject?: Partial<URL>,
} = {})
{
	const ipfsServerList: IIPFSClientAddresses[] = [];
	const { IPFS_ADDRESSES_API } = ipfsEnv();

	if (typeof IPFS_ADDRESSES_API === 'string' && IPFS_ADDRESSES_API.length)
	{
		ipfsServerList.push(IPFS_ADDRESSES_API);
	}

	const {
		urlObject = {
			/**
			 * https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs-http-client/src/lib/core.js
			 */
			host: typeof window === 'undefined' ? void 0 : '127.0.0.1',
			protocol: typeof window === 'undefined' ? void 0 : 'http',
		},
	} = options;

	ipfsServerList.push({
		...urlObject,
		port: '5002',
	});

	ipfsServerList.push({
		...urlObject,
		port: '5001',
	});

	return ipfsServerList
}
