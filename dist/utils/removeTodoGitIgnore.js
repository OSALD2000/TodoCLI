"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodoGitIgnore = void 0;
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var removeTodoGitIgnore = function (path_parmeter) {
    var git_path = path_1.default.join(path_parmeter, ".git");
    if (fs.existsSync(git_path)) {
        var gitignor_path = path_1.default.join(path_parmeter, ".gitignore");
        try {
            var data = fs.readFileSync(gitignor_path, 'utf8');
            var lines = data.split("\n");
            var filteredLines = lines.filter(function (line) { return line.trim() !== ".todo"; });
            var updatedContent = filteredLines.join("\n");
            fs.writeFileSync(gitignor_path, updatedContent, 'utf8');
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    else {
        return (0, exports.removeTodoGitIgnore)(path_1.default.join(path_parmeter, ".."));
    }
};
exports.removeTodoGitIgnore = removeTodoGitIgnore;
