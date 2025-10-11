"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../../app-config/config.json"));
exports.default = config_json_1.default;
console.log('MONGODB_URI:', config_json_1.default.MONGODB_URI);
//# sourceMappingURL=config.js.map