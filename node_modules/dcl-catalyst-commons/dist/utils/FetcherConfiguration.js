"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST_DEFAULTS = exports.FETCH_BUFFER_DEFAULTS = exports.FETCH_JSON_DEFAULTS = exports.FETCHER_DEFAULTS = exports.getAllHeaders = void 0;
const cookie_1 = __importDefault(require("cookie"));
function getAllHeaders(options) {
    const headers = options.headers || {};
    if (options.cookies && Object.entries(options.cookies).length > 0) {
        headers['Cookie'] = Object.entries(options.cookies)
            .map((entry) => cookie_1.default.serialize(entry[0], entry[1]))
            .reduce((a, b) => `${a}; ${b}`);
    }
    return headers;
}
exports.getAllHeaders = getAllHeaders;
exports.FETCHER_DEFAULTS = {
    method: 'GET',
    attempts: 1,
    waitTime: '1s',
    timeout: '5m'
};
exports.FETCH_JSON_DEFAULTS = {
    ...exports.FETCHER_DEFAULTS,
    timeout: '30s',
    waitTime: '0.5s'
};
exports.FETCH_BUFFER_DEFAULTS = {
    ...exports.FETCHER_DEFAULTS,
    timeout: '1m'
};
exports.POST_DEFAULTS = {
    ...exports.FETCHER_DEFAULTS,
    method: 'POST'
};
//# sourceMappingURL=FetcherConfiguration.js.map