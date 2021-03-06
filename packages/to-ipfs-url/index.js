"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLink = exports.toPath = exports.toURL = exports.pathToCid = exports.isCidOrPath = exports.isPath = exports.EnumIPFSLinkType = void 0;
const is_ipfs_1 = __importDefault(require("is-ipfs"));
const ipfs_server_list_1 = __importDefault(require("ipfs-server-list"));
var EnumIPFSLinkType;
(function (EnumIPFSLinkType) {
    EnumIPFSLinkType["ipfs"] = "ipfs";
    EnumIPFSLinkType["ipld"] = "ipld";
    EnumIPFSLinkType["ipns"] = "ipns";
    EnumIPFSLinkType["Gateway"] = "ipfs";
    EnumIPFSLinkType["IPFS"] = "ipfs";
    EnumIPFSLinkType["IPLD"] = "ipld";
    EnumIPFSLinkType["IPNS"] = "ipns";
})(EnumIPFSLinkType = exports.EnumIPFSLinkType || (exports.EnumIPFSLinkType = {}));
function isPath(cid) {
    return is_ipfs_1.default.path(cid) || is_ipfs_1.default.ipnsPath(cid) || is_ipfs_1.default.cidPath(cid);
}
exports.isPath = isPath;
function isCidOrPath(cid) {
    return is_ipfs_1.default.cid(cid) || isPath(cid);
}
exports.isCidOrPath = isCidOrPath;
function pathToCid(cid) {
    return cid.replace(/^\/ip[nf]s\//, '');
}
exports.pathToCid = pathToCid;
function toURL(cid, options = {}) {
    var _a, _b, _c, _d, _e, _f;
    if (typeof options === 'string') {
        options = {
            filename: options,
        };
    }
    if (!options.ignoreCheck && !isCidOrPath(cid)) {
        throw new TypeError(`cid '${cid}' is not valid ipfs`);
    }
    let { filename, type } = options || {};
    let prefix = (_b = (_a = options.prefix) === null || _a === void 0 ? void 0 : _a.ipfs) !== null && _b !== void 0 ? _b : ipfs_server_list_1.default.ipfs.Gateway;
    switch (type) {
        case EnumIPFSLinkType.IPLD:
            prefix = (_d = (_c = options.prefix) === null || _c === void 0 ? void 0 : _c.ipld) !== null && _d !== void 0 ? _d : `https://explore.ipld.io/#/explore/`;
            break;
        case EnumIPFSLinkType.IPNS:
            //prefix = `https://gateway.ipfs.io/ipns/`;
            prefix = (_f = (_e = options.prefix) === null || _e === void 0 ? void 0 : _e.ipns) !== null && _f !== void 0 ? _f : `https://ipfs.io/ipns/`;
            break;
    }
    if (isPath(cid)) {
        cid = pathToCid(cid);
    }
    let url = new URL(`${prefix}${cid}`);
    if (typeof filename === 'string' && filename.length > 0) {
        url.searchParams.set('filename', filename);
    }
    return url;
}
exports.toURL = toURL;
function toPath(cid, options) {
    return toURL(cid, options).pathname;
}
exports.toPath = toPath;
function toLink(cid, options) {
    return toURL(cid, options).href;
}
exports.toLink = toLink;
exports.default = toURL;
//# sourceMappingURL=index.js.map