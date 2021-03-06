import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import { setConfigIfNotExists, fillEntryIfNotExists } from '../../util/setConfigIfNotExists';

export async function configApiCors(ipfs: IIPFSConfigApi)
{
	let ls: boolean[] = [];
	let bool: boolean;
	bool = await setConfigIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Origin', [
		'https://webui.ipfs.io',
		'https://dev.webui.ipfs.io/',
		'*',
	])
	ls.push(bool);

	bool = await setConfigIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Methods', fillEntryIfNotExists([
		'HEAD',
		'PUT',
		'GET',
		'POST',
		'OPTIONS',
	]))
	ls.push(bool);

	bool = await setConfigIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Headers', ['Authorization'])
	ls.push(bool);

	bool = await setConfigIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Expose-Headers', ['Location'])
	ls.push(bool);

	bool = await setConfigIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Credentials', ['true'])
	ls.push(bool);

	return ls
}

export default configApiCors
