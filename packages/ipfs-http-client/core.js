"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.find = exports.getDefaultServerList = exports.some = void 0;
const ipfs_util_lib_1 = require("ipfs-util-lib");
const ipfs_env_1 = __importDefault(require("ipfs-env"));
async function some(ipfsClient, configs, skipCheck) {
    let ipfs;
    for (let argv of configs) {
        try {
            ipfs = ipfsClient(...argv);
            if (!skipCheck) {
                //await ipfs.id();
                await ipfs_util_lib_1.checkIPFS(ipfs);
            }
            break;
        }
        catch (e) { }
    }
    return ipfs;
}
exports.some = some;
function getDefaultServerList() {
    const ipfsServerList = [];
    const { IPFS_ADDRESSES_API } = ipfs_env_1.default();
    if (typeof IPFS_ADDRESSES_API === 'string' && IPFS_ADDRESSES_API.length) {
        ipfsServerList.push(IPFS_ADDRESSES_API);
    }
    ipfsServerList.push({ port: '5001' });
    ipfsServerList.push({ port: '5002' });
    return ipfsServerList;
}
exports.getDefaultServerList = getDefaultServerList;
function find(ipfsHttpModule) {
    return async function findIpfsClient(ipfsServerList, options = {}) {
        return some(ipfsHttpModule, ipfsServerList
            .map(address => {
            return [address, ...options.clientArgvs];
        }), options.skipCheck);
    };
}
exports.find = find;
function use(ipfsHttpModule) {
    return async function ipfsClient(...argvs) {
        const [config, ...argv] = argvs;
        if (typeof config === 'undefined' || config === null) {
            return find(ipfsHttpModule)(getDefaultServerList(), {
                clientArgvs: argv,
            });
        }
        return ipfsHttpModule(config, ...argv);
    };
}
exports.use = use;
exports.default = use;
//# sourceMappingURL=core.js.map