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
exports.reset = void 0;
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var Todo_1 = require("../model/Todo");
var class_transformer_1 = require("class-transformer");
var removeTodoGitIgnore_1 = require("../utils/removeTodoGitIgnore");
var fs_1 = require("fs");
var reset = function (command) {
    var data = JSON.parse(fs.readFileSync(path_1.default.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));
    var todos = (0, class_transformer_1.plainToInstance)(Todo_1.TodoList, [data])[0];
    if (todos.gitignore) {
        (0, removeTodoGitIgnore_1.removeTodoGitIgnore)(process.cwd());
    }
    (0, fs_1.rmSync)(path_1.default.resolve(process.cwd(), ".todo/todo.json"));
    (0, fs_1.rmdirSync)(path_1.default.resolve(process.cwd(), ".todo"));
};
exports.reset = reset;
