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
exports.TodoList = void 0;
var create_Id_1 = require("../utils/create_Id");
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var Todo = /** @class */ (function () {
    function Todo(id, text, date, hidden) {
        if (hidden === void 0) { hidden = false; }
        this.id = id;
        this.text = text;
        this.date = date;
        this.hidden = hidden;
    }
    return Todo;
}());
var TodoList = /** @class */ (function () {
    function TodoList(id, list_name) {
        this.id = id;
        this.list_name = list_name;
        this.todos = [];
        this.todos_done = [];
        this.gitignore = false;
    }
    TodoList.prototype.addTodo = function (text) {
        if (text.trim().length > 1) {
            var todo = new Todo((0, create_Id_1.createID)(), text, (new Date()).toISOString());
            this.todos.push(todo);
        }
        else
            console.log("mind. 3 Zeichen");
    };
    TodoList.prototype.deleteTodo = function (idx, done) {
        if (done) {
            if (idx < this.todos_done.length) {
                return this.todos_done.splice(idx, 1)[0];
            }
            else {
                console.log("unvalid Index !!!");
            }
        }
        else {
            if (idx < this.todos.length) {
                return this.todos.splice(idx, 1)[0];
            }
            else {
                console.log("unvalid Index !!!");
            }
        }
    };
    TodoList.prototype.addToDone = function (todo) {
        todo.date = new Date().toISOString();
        this.todos_done.push(todo);
    };
    TodoList.prototype.hideTodo = function (idx) {
        if (idx < this.todos_done.length) {
            return this.todos_done[idx].hidden = true;
        }
        else {
            console.log("unvalid Index !!!");
        }
    };
    TodoList.prototype.save = function () {
        fs.writeFileSync(path_1.default.resolve(process.cwd(), ".todo/todo.json"), JSON.stringify(this, null, 5));
    };
    Object.defineProperty(TodoList.prototype, "all_todos", {
        get: function () {
            return this.todos;
        },
        enumerable: false,
        configurable: true
    });
    TodoList.prototype.print_all_todos = function (done, hidden) {
        if (!done) {
            console.log('\x1b[33m%s\x1b[0m', "Aktuelle Todos: ");
            var filtterd_todos = this.todos.filter(function (todo) { return !todo.hidden; });
            var table = filtterd_todos.map(function (todo) {
                var create_date = new Date(todo.date);
                var tag = create_date.getDate();
                var monat = create_date.getMonth() + 1;
                var jahr = create_date.getFullYear();
                var stunden = create_date.getHours();
                var minuten = create_date.getMinutes();
                var formatiertesDatum = "".concat(tag, "/").concat(monat, "/").concat(jahr, " ").concat(stunden, ":").concat(minuten, " ");
                return { Create_date: formatiertesDatum, Todo: todo.text };
            });
            console.table(table);
        }
        console.log('\x1b[36m%s\x1b[0m', "Erledigt Todos: ");
        var filtterd_todos_done;
        if (hidden) {
            filtterd_todos_done = this.todos_done;
        }
        else {
            filtterd_todos_done = this.todos_done.filter(function (todo) { return !todo.hidden; });
        }
        var table_done = filtterd_todos_done.map(function (todo) {
            var create_date = new Date(todo.date);
            var tag = create_date.getDate();
            var monat = create_date.getMonth() + 1;
            var jahr = create_date.getFullYear();
            var stunden = create_date.getHours();
            var minuten = create_date.getMinutes();
            var formatiertesDatum = "".concat(tag, "/").concat(monat, "/").concat(jahr, " ").concat(stunden, ":").concat(minuten, " ");
            return { Done_date: formatiertesDatum, Erledigt_Todos: todo.text };
        });
        console.table(table_done);
    };
    return TodoList;
}());
exports.TodoList = TodoList;
