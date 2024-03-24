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
exports.command_executer = void 0;
var COMMANDS_1 = require("../model/COMMANDS");
var run_1 = require("../command/run");
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
function command_executer(command) {
    if (command.befehl === COMMANDS_1.COMMANDS.HELP_LONG || command.befehl === COMMANDS_1.COMMANDS.HELP_SHORT) {
        run_1.run.help(command);
    }
    else if (command.befehl === COMMANDS_1.COMMANDS.CREATE) {
        if (!fs.existsSync(path_1.default.resolve(process.cwd(), ".todo"))) {
            run_1.run.create(command);
        }
        else {
            console.error("todo List existiert in dem Ordner !!");
        }
    }
    else if (fs.existsSync(path_1.default.resolve(process.cwd(), ".todo"))) {
        switch (command.befehl) {
            case COMMANDS_1.COMMANDS.ADD:
                run_1.run.add(command);
                break;
            case COMMANDS_1.COMMANDS.DELETE:
                run_1.run.delete(command);
                break;
            case COMMANDS_1.COMMANDS.DONE:
                run_1.run.done(command);
                break;
            case COMMANDS_1.COMMANDS.HIDE:
                run_1.run.hide(command);
                break;
            case COMMANDS_1.COMMANDS.IGNORE:
                run_1.run.ignore(command);
                break;
            case COMMANDS_1.COMMANDS.RESET_LONG:
            case COMMANDS_1.COMMANDS.RESET_SHORT:
                if (fs.existsSync(path_1.default.resolve(process.cwd(), ".todo/todo.json"))) {
                    run_1.run.reset(command);
                }
                break;
            case COMMANDS_1.COMMANDS.SHOW:
                run_1.run.show(command);
                break;
            default:
                console.error("command not found!!");
                break;
        }
    }
    else {
        console.error("todo List existiert nicht in dem Ordner !!");
    }
}
exports.command_executer = command_executer;
