"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsServerList = exports.filterList = exports.getIpfsLocalList = exports.getIpfsServerList = void 0;
function getIpfsServerList() {
    /**
     * @see https://ipfs.github.io/public-gateway-checker/
     */
    let data = {
        'ipfs': {
            Gateway: 'https://ipfs.io/ipfs/',
            IPLD: 'https://explore.ipld.io/#/explore/',
            IPNS: 'https://ipfs.io/ipns/',
        },
        /**
         * http://blog.hubwiz.com/2019/09/11/infura-dev-manual/
         * http://cw.hubwiz.com/card/c/infura-api/1/4/3/
         * https://github.com/Pedro-vk/ipfs-website-deployer/blob/master/src/ipfs-website-deployer-cli.ts
         * https://infura.io/docs/ipfs/get/version
         */
        'infura.io': {
            API: {
                port: 5001,
                host: 'ipfs.infura.io',
                protocol: 'https',
            },
            Gateway: 'https://ipfs.infura.io/ipfs/',
            limit: {
                ref: false,
                id: false,
                config: false,
                ls: false,
            },
        },
        /**
         * https://developers.cloudflare.com/distributed-web/ipfs-gateway/
         */
        'cloudflare': {
            Gateway: 'https://cloudflare-ipfs.com/ipfs/',
            GatewayDomain: '.cf-ipfs.com',
        },
        'ipfs.gateway': {
            Gateway: 'https://gateway.ipfs.io/ipfs/',
        },
        'dweb': {
            GatewayDomain: '.ipfs.dweb.link',
        },
        /**
         * https://fleek.co/
         */
        'fleek': {
            Gateway: 'https://ipfs.fleek.co/ipfs/',
            IPNS: 'https://ipfs.fleek.co/ipns/',
            GatewayDomain: '.on.fleek.co',
        },
        'bdaily': {
            Gateway: 'https://gateway.bdaily.club/ipfs/',
        },
        'globalupload': {
            Gateway: 'https://ipfs.globalupload.io/',
        },
        'pinata': {
            Gateway: 'https://gateway.pinata.cloud/ipfs/',
        },
        'hardbin': {
            Gateway: 'https://hardbin.com/ipfs/',
        },
        'eternum': {
            Gateway: 'https://ipfs.eternum.io/ipfs/',
        },
        'temporal': {
            Gateway: 'https://gateway.temporal.cloud/ipfs/',
            IPNS: 'https://gateway.temporal.cloud/ipns/',
        },
        'sloppyta': {
            Gateway: 'https://ipfs.sloppyta.co/ipfs/',
        },
        'greyh': {
            Gateway: 'https://ipfs.greyh.at/ipfs/',
        },
        'jorropo': {
            Gateway: 'https://jorropo.ovh/ipfs/',
        },
        'jeroendeneef': {
            Gateway: 'https://ipfs.jeroendeneef.com/ipfs/',
        },
        '2read': {
            GatewayDomain: '.ipfs.2read.net',
            Gateway: 'https://ipfs.2read.net/ipfs/',
        },
        'runfission': {
            Gateway: 'https://ipfs.runfission.com/ipfs/',
        },
        'best-practice': {
            Gateway: 'https://ipfs.best-practice.se/ipfs/',
        },
        'privacytools': {
            Gateway: 'https://ipfs.privacytools.io/ipfs/',
        },
        'trusti': {
            Gateway: 'https://trusti.id/ipfs/',
        },
        'stibarc': {
            Gateway: 'https://ipfs.stibarc.com/ipfs/',
        },
        'dtube': {
            name: 'DTube',
            Gateway: 'https://snap1.d.tube/ipfs/',
            btfsGateway: 'https://player.d.tube/btfs/',
        },
        'dtube.2': {
            name: 'DTube',
            btfsGateway: 'https://sprite.d.tube/btfs/',
        },
        'cosmos-ink': {
            GatewayDomain: '.ipfs.cosmos-ink.net',
        },
        'storjipfs-gateway': {
            Gateway: 'https://storjipfs-gateway.com/ipfs/',
        },
        'permaweb': {
            Gateway: 'https://permaweb.io/ipfs/',
        },
        'cwinfo': {
            Gateway: 'https://cdn.cwinfo.net/ipfs/',
        },
        'fooock': { Gateway: 'https://ipfs.fooock.com/ipfs/' },
        'serph.network': { Gateway: 'https://gateway.serph.network/ipfs/' },
        'busy.org': { Gateway: 'https://ipfs.busy.org/ipfs/' },
        'doolta': { Gateway: 'https://ipfs.doolta.com/ipfs/' },
        'originprotocol': { Gateway: 'https://gateway.originprotocol.com/ipfs/' },
        'mrh.io': { Gateway: 'https://ipfs.mrh.io/ipfs/' },
        'ipns.co': { Gateway: 'https://ipns.co/' },
        'blocksec': { Gateway: 'https://gateway.blocksec.com/ipfs/' },
        '10.via0.com': { Gateway: 'https://10.via0.com/ipfs/' },
        'ninetailed.ninja': { Gateway: 'https://ninetailed.ninja/ipfs/' },
        'geesome-node': {
            description: `https://github.com/galtproject/geesome-node`,
            Gateway: 'https://geesome-node.galtproject.io:7722/ipfs/',
            IPNS: 'https://geesome-node.galtproject.io:7722/ipns/',
        },
    };
    data;
    return data;
}
exports.getIpfsServerList = getIpfsServerList;
function getIpfsLocalList() {
    let data = {
        'go-ipfs': {
            API: {
                port: 5001,
            },
        },
        'js-ipfs': {
            API: {
                port: 5002,
            },
        },
    };
    data;
    return data;
}
exports.getIpfsLocalList = getIpfsLocalList;
function filterList(key, serverList = exports.ipfsServerList) {
    return Object.keys(serverList)
        .reduce((a, b) => {
        if (serverList[b][key] != null) {
            a.push(serverList[b][key]);
        }
        return a;
    }, []);
}
exports.filterList = filterList;
exports.ipfsServerList = getIpfsServerList();
exports.default = exports.ipfsServerList;
//# sourceMappingURL=index.js.map