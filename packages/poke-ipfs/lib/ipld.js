"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeIPLD = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const ndjson_1 = require("./ndjson");
const util_1 = require("./util");
const abort_controller_timer_1 = require("abort-controller-timer");
function pokeIPLD(cid, options) {
    let url = util_1.corsURL('https://node0.preload.ipfs.io/api/v0/refs', options === null || options === void 0 ? void 0 : options.cors);
    url.searchParams.set('r', 'true');
    url.searchParams.set('arg', cid.toString());
    let fetchOptions = {};
    let controller = new abort_controller_timer_1.AbortControllerTimer((options === null || options === void 0 ? void 0 : options.timeout) || 1000);
    fetchOptions.signal = controller.signal;
    return cross_fetch_1.default(url.href, fetchOptions)
        .then(async (res) => {
        const { headers, status, statusText } = res;
        for await (const chunk of ndjson_1.ndjson(res.body)) {
            if (chunk === null || chunk === void 0 ? void 0 : chunk.Ref) {
                return {
                    value: true,
                    status,
                    statusText,
                    headers,
                };
            }
        }
        if (status < 200 || status >= 400) {
            return {
                value: false,
                status,
                statusText,
                headers,
            };
        }
        return {
            //value: null as void,
            status,
            statusText,
            headers,
        };
    })
        .catch((error) => {
        return {
            error,
        };
    })
        .finally(() => controller.clear());
}
exports.pokeIPLD = pokeIPLD;
exports.default = pokeIPLD;
//# sourceMappingURL=ipld.js.map