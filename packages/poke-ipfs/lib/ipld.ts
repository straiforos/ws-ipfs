/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import fetch from 'cross-fetch';
import { ndjson } from './ndjson';
import { IPokeReturn, IPokeReturnBase } from './types';

export function pokeIPLD(cid: ICIDValue)
{
	let url = new URL('https://node0.preload.ipfs.io/api/v0/refs');

	url.searchParams.set('r', 'true');
	url.searchParams.set('arg', cid.toString());

	return fetch(url.href)
		.then(async (res) =>
		{
			const { status, statusText } = res;

			for await (const chunk of ndjson<{
				Ref: string,
				Err: string,
			}>(res.body as any))
			{
				if (chunk?.Ref)
				{
					return {
						value: true as true,
						status,
						statusText,
					} as IPokeReturn<{
						value: true,
					}>
				}
			}

			if (status < 200 || status >= 400)
			{
				return {
					value: false as false,
					status,
					statusText,
				} as IPokeReturn<{
					value: false,
				}>
			}

			return {
				//value: null as void,
				status,
				statusText,
			} as IPokeReturn
		})
		.catch((error: Error) =>
		{
			return {
				error,
			} as IPokeReturn<{
				error: Error;
			}>
		})
}

export default pokeIPLD
