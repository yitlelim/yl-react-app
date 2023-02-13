"use strict";
/**
 * fetch data from rest api
 *
 * @param {string} url
 * @param {string} accesToken
 * @param {object} options
 * @param {string} [options.method]
 * @param {string} [options.payloadd] - request body
 * @param {object} [options.headers]
 *
 * @returns {Promise}
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.request = void 0;
var request = function (url, accesToken, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var config, setupErrors, token, headers, body, params, formBody_1, payload_1;
        return __generator(this, function (_a) {
            config = __assign({ method: 'GET', payload: {}, headers: {} }, options);
            setupErrors = [''];
            if (!url) {
                setupErrors.push('url');
            }
            token = accesToken;
            headers = token
                ? __assign({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization: "Bearer ".concat(token) }, config.headers) : __assign({ 'Content-Type': 'application/json', Accept: 'application/json' }, config.headers);
            body = null;
            params = {
                headers: headers,
                method: config.method,
                body: body
            };
            if (params.method !== 'GET') {
                if (params.headers &&
                    params.headers['Content-Type'] &&
                    params.headers['Content-Type'].match('application/x-www-form-urlencoded')) {
                    formBody_1 = [];
                    payload_1 = config.payload;
                    Object.keys(payload_1).forEach(function (key) {
                        var encodedKey = encodeURIComponent(key);
                        var encodedValue = encodeURIComponent(payload_1[key]);
                        formBody_1.push("".concat(encodedKey, "=").concat(encodedValue));
                    });
                    formBody_1 = formBody_1.join('&');
                    params.body = formBody_1;
                }
                else {
                    params.body = JSON.stringify(config.payload);
                }
            }
            return [2 /*return*/, fetch(url, params).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                    var success, error;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!response.ok) return [3 /*break*/, 2];
                                _a = {};
                                return [4 /*yield*/, getJSON(response)];
                            case 1:
                                success = (_a.payload = _c.sent(),
                                    _a.status = response.status,
                                    _a);
                                return [2 /*return*/, success];
                            case 2:
                                _b = {
                                    error: true
                                };
                                return [4 /*yield*/, getJSON(response).then(function () {
                                        return new ApiError();
                                    })];
                            case 3:
                                error = (_b.payload = _c.sent(),
                                    _b);
                                throw error;
                        }
                    });
                }); })];
        });
    });
};
exports.request = request;
/**
 * Extract JSON from server response
 *
 * @function getJSON
 * @access public
 * @param {object} response - raw respose object
 * @returns {Promise| undefined}
 */
var getJSON = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var contentType, emptyCodes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contentType = response.headers.get('Content-Type');
                emptyCodes = [204, 205];
                if (!(contentType &&
                    contentType.indexOf('json') !== -1 &&
                    emptyCodes.indexOf(response.status))) return [3 /*break*/, 2];
                return [4 /*yield*/, response.json()];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, Promise.resolve()];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError() {
        var _this = _super.call(this) || this;
        _this.name = 'ApiError';
        return _this;
    }
    return ApiError;
}(Error));
