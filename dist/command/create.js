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
exports.create = void 0;
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var Todo_1 = require("../model/Todo");
var create_Id_1 = require("../utils/create_Id");
var isInsideGitRepositiry_1 = require("../utils/isInsideGitRepositiry");
var addTodoGitIgnore_1 = require("../utils/addTodoGitIgnore");
var create = function (command) {
    var created = false;
    fs.mkdirSync(path_1.default.join(process.cwd(), ".todo"));
    created = true;
    if (created) {
        var name_1 = "todo-list";
        var todoList = new Todo_1.TodoList((0, create_Id_1.createID)(), name_1);
        if (command.has_option) {
            if ((0, isInsideGitRepositiry_1.isInsideGitRepositiry)()[0]) {
                (0, addTodoGitIgnore_1.addTodoGitIgnore)(process.cwd());
                todoList.gitignore = true;
            }
        }
        console.log("todo list created !! \n");
        todoList.save();
    }
};
exports.create = create;
