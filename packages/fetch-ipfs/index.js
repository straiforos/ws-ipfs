"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchIPFSCore = exports.fetchIPFS = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const buffer_1 = require("buffer");
const ipfs_1 = __importDefault(require("./ipfs"));
const bluebird_1 = __importDefault(require("bluebird"));
const is_error_code_1 = __importDefault(require("is-error-code"));
const util_1 = require("./util");
async function fetchIPFS(cid, useIPFS, timeout) {
    cid = util_1.handleCID(cid, useIPFS);
    return fetchIPFSCore(cid, useIPFS, timeout);
}
exports.fetchIPFS = fetchIPFS;
async function fetchIPFSCore(cid, useIPFS, timeout) {
    timeout = util_1.handleTimeout(timeout);
    if (useIPFS) {
        return ipfs_1.default(cid, useIPFS, timeout);
    }
    const { controller, timer } = util_1.newAbortController(timeout);
    return bluebird_1.default.resolve(cross_fetch_1.default(cid, {
        redirect: 'follow',
        // @ts-ignore
        timeout,
        signal: controller.signal,
    }))
        .finally(() => clearTimeout(timer))
        .tap(v => {
        if (is_error_code_1.default(v.status)) {
            let e = new Error(v.statusText);
            // @ts-ignore
            e.res = v;
            return Promise.reject(e);
        }
    })
        .then(v => v.arrayBuffer())
        .then(buf => buffer_1.Buffer.from(buf));
}
exports.fetchIPFSCore = fetchIPFSCore;
exports.default = fetchIPFS;
//# sourceMappingURL=index.js.map