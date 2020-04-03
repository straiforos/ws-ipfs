"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeURL = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const util_1 = require("./util");
function pokeURL(ipfsURL, options) {
    let url = util_1.corsURL(ipfsURL.toString(), options === null || options === void 0 ? void 0 : options.cors);
    return cross_fetch_1.default(url.href, {
        method: 'HEAD',
    })
        .then(async (res) => {
        var _a, _b;
        const { headers, status, statusText } = res;
        let xIpfsPath = ((_a = headers.get) === null || _a === void 0 ? void 0 : _a.call(headers, 'x-ipfs-path')) || ((_b = headers.get) === null || _b === void 0 ? void 0 : _b['X-Ipfs-Path']) || (headers === null || headers === void 0 ? void 0 : headers['x-ipfs-path']) || (headers === null || headers === void 0 ? void 0 : headers['x-ipfs-path']);
        if (xIpfsPath) {
            return {
                value: xIpfsPath,
                status,
                statusText,
            };
        }
        else if (status < 200 || status >= 400) {
            return {
                value: false,
                status,
                statusText,
            };
        }
        return {
            value: null,
            status,
            statusText,
        };
    })
        .catch((error) => {
        return {
            error,
        };
    });
}
exports.pokeURL = pokeURL;
exports.default = pokeURL;
//# sourceMappingURL=pokeURL.js.map