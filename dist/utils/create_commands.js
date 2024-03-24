"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_commands = void 0;
var Comand_1 = require("../model/Comand");
var COMMANDS_1 = require("../model/COMMANDS");
var getCommandsIdx = function (args) {
    var indexs_array = [];
    args.forEach(function (arg, idx) {
        if (Object.values(COMMANDS_1.COMMANDS).includes(arg)) {
            indexs_array.push(idx);
        }
    });
    indexs_array.push(-1);
    return indexs_array;
};
var getCommandRange = function (start_idx, indexs_array) {
    return [indexs_array[start_idx] + 1, indexs_array[start_idx + 1]];
};
var create_commands = function (args) {
    var commands = [];
    if (args.length >= 0) {
        var indexs_array_1 = getCommandsIdx(args);
        indexs_array_1.forEach(function (command_index, idx) {
            if (command_index >= 0) {
                var _a = getCommandRange(idx, indexs_array_1), start_idx = _a[0], end_idx = _a[1];
                if (args[command_index] === COMMANDS_1.COMMANDS.ADD) {
                    var text = void 0;
                    if (end_idx > 0) {
                        text = args.slice(start_idx, end_idx);
                    }
                    else {
                        text = args.slice(start_idx);
                    }
                    if (text.length < 0) {
                        console.error("--add : no input text to add !!");
                    }
                    else {
                        commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.ADD, true, false, text.join(" ")));
                    }
                }
                if (args[command_index] === COMMANDS_1.COMMANDS.SHOW) {
                    var command_option = [];
                    if (end_idx > 0) {
                        args[start_idx] === COMMANDS_1.COMMANDS.SHOW_ONLY_DONE ? command_option.push(COMMANDS_1.COMMANDS.SHOW_ONLY_DONE) : false;
                        args[start_idx] === COMMANDS_1.COMMANDS.SHOW_HIDDEN ? command_option.push(COMMANDS_1.COMMANDS.SHOW_HIDDEN) : false;
                    }
                    commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.SHOW, false, command_option.length > 0, undefined, command_option));
                }
                if (args[command_index] === COMMANDS_1.COMMANDS.HELP_LONG || args[command_index] === COMMANDS_1.COMMANDS.HELP_SHORT) {
                    commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.HELP_LONG, false, false));
                }
                if (args[command_index] === COMMANDS_1.COMMANDS.CREATE) {
                    var command_option = [];
                    if (end_idx > 0) {
                        args[start_idx] === COMMANDS_1.COMMANDS.CREATE_MIT_IGNORE ? command_option.push(COMMANDS_1.COMMANDS.CREATE_MIT_IGNORE) : false;
                    }
                    commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.CREATE, true, command_option.length > 0, undefined, command_option));
                }
                if (args[command_index] === COMMANDS_1.COMMANDS.DELETE) {
                    var idx_to_delete = void 0;
                    var command_option = [];
                    if (end_idx > 0) {
                        args[start_idx] === COMMANDS_1.COMMANDS.DELETE_DONE ? command_option.push(COMMANDS_1.COMMANDS.DELETE_DONE) : false;
                    }
                    if (command_option.length > 0) {
                        idx_to_delete = (start_idx + 1) < args.length ? +args[start_idx + 1] : NaN;
                    }
                    else {
                        idx_to_delete = (start_idx) < args.length ? +args[start_idx] : NaN;
                    }
                    if (!Number.isNaN(idx_to_delete)) {
                        commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.DELETE, true, command_option.length > 0, idx_to_delete, command_option));
                    }
                    else {
                        console.error("--delete : unvalid index !!!");
                    }
                }
                if (args[command_index] === COMMANDS_1.COMMANDS.DONE) {
                    var idx_to_move = (start_idx) < args.length ? +args[start_idx] : NaN;
                    if (!Number.isNaN(idx_to_move)) {
                        commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.DONE, true, false, idx_to_move));
                    }
                    else {
                        console.error("--done : unvalid index !!!");
                    }
                }
                if (args[command_index] === COMMANDS_1.COMMANDS.HIDE) {
                    var idx_to_hide = (start_idx) < args.length ? +args[start_idx] : NaN;
                    if (!Number.isNaN(idx_to_hide)) {
                        commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.DELETE, true, false, idx_to_hide));
                    }
                    else {
                        console.error("--done : unvalid index !!!");
                    }
                }
                if (args[command_index] === COMMANDS_1.COMMANDS.RESET_LONG || args[command_index] === COMMANDS_1.COMMANDS.RESET_SHORT) {
                    commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.RESET_LONG, false, false));
                }
                if (args[command_index] === COMMANDS_1.COMMANDS.IGNORE) {
                    var command_option = [];
                    if (end_idx > 0) {
                        args[start_idx] === COMMANDS_1.COMMANDS.NOT_IGNORE ? command_option.push(COMMANDS_1.COMMANDS.NOT_IGNORE) : false;
                    }
                    commands.push(new Comand_1.Command(COMMANDS_1.COMMANDS.IGNORE, false, command_option.length > 0, undefined, command_option));
                }
            }
        });
        if (commands.length === 0) {
            console.error("command not dound !!");
        }
        return commands;
    }
    else {
        return [];
    }
};
exports.create_commands = create_commands;
