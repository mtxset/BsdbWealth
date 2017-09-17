"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var BSDB = artifacts.require("BSDB");
var index_1 = require("./helpers/index");
var chai_1 = require("chai");
var cc = null;
var decimals = 8;
var ccTotalSupply = 81 * Math.pow(10, (6 + 8)); // 9.999 Billions
var king; // will use this as owner
var queen;
var jack;
var ace;
var joker;
var magpie;
// Helper functions
function ReturnEventAndArgs(returnVal) {
    return { eventName: returnVal.logs[0].event,
        eventArgs: returnVal.logs[0].args.action,
        raw: returnVal };
}
// -- Helper functions
contract("BSDB", function (accounts) {
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            king = accounts[0];
            queen = accounts[1];
            jack = accounts[2];
            ace = accounts[3];
            joker = accounts[4];
            magpie = accounts[5];
            return [2 /*return*/];
        });
    }); });
    describe("Initialize", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            describe("Correct Init", function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    it("It should initialize", function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, BSDB.new({ from: king })];
                                case 1:
                                    cc = _d.sent();
                                    _a = chai_1.expect;
                                    return [4 /*yield*/, cc.owner()];
                                case 2:
                                    _a.apply(void 0, [_d.sent(),
                                        "Owners should match"])
                                        .to.equal(king);
                                    _b = chai_1.expect;
                                    return [4 /*yield*/, cc.totalSupply()];
                                case 3:
                                    _b.apply(void 0, [(_d.sent()).toNumber(),
                                        "Total supply should match"])
                                        .to.equal(ccTotalSupply);
                                    _c = chai_1.expect;
                                    return [4 /*yield*/, cc.balanceOf(king)];
                                case 4:
                                    _c.apply(void 0, [(_d.sent()).toNumber(),
                                        "Balance should equal to initial supply"])
                                        .to.equal(ccTotalSupply);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    describe("Function: transferOwnership(address newOwner) ", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            it("Should correctly transfer ownership", function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, BSDB.new({ from: king })];
                        case 1:
                            cc = _c.sent();
                            // Checking current owner
                            _a = chai_1.expect;
                            return [4 /*yield*/, cc.owner()];
                        case 2:
                            // Checking current owner
                            _a.apply(void 0, [_c.sent(),
                                "Owners should match"])
                                .to.equal(king);
                            return [4 /*yield*/, cc.transferOwnership(queen, { from: king })];
                        case 3:
                            _c.sent();
                            _b = chai_1.expect;
                            return [4 /*yield*/, cc.owner()];
                        case 4:
                            _b.apply(void 0, [_c.sent(),
                                "Owners should match"])
                                .to.equal(queen);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Should not trasnfer ownership (not owner transfers)", function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, BSDB.new({ from: king })];
                        case 1:
                            cc = _c.sent();
                            _a = chai_1.expect;
                            return [4 /*yield*/, cc.owner()];
                        case 2:
                            _a.apply(void 0, [_c.sent(),
                                "Owners should match"])
                                .to.equal(king);
                            _b = chai_1.expect;
                            return [4 /*yield*/, index_1.expectThrow(cc.transferOwnership(jack, { from: queen }))];
                        case 3:
                            _b.apply(void 0, [_c.sent(),
                                "Should throw"])
                                .to.be.true;
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Should not transfer ownership (passing 0 address)", function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, BSDB.new({ from: king })];
                        case 1:
                            cc = _c.sent();
                            _a = chai_1.expect;
                            return [4 /*yield*/, cc.owner()];
                        case 2:
                            _a.apply(void 0, [_c.sent(),
                                "Owners should match"])
                                .to.equal(king);
                            _b = chai_1.expect;
                            return [4 /*yield*/, index_1.expectThrow(cc.transferOwnership(0, { from: king }))];
                        case 3:
                            _b.apply(void 0, [_c.sent(),
                                "Should throw"])
                                .to.be.true;
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=BSDB.js.map