"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var create_1 = require("./create");
var add_1 = require("./add");
var delete_1 = require("./delete");
var done_1 = require("./done");
var help_1 = require("./help");
var hide_1 = require("./hide");
var ignore_1 = require("./ignore");
var reset_1 = require("./reset");
var show_1 = require("./show");
exports.run = {
    create: create_1.create,
    add: add_1.add,
    delete: delete_1.delete_command,
    done: done_1.done,
    help: help_1.help,
    hide: hide_1.hide,
    ignore: ignore_1.ignore,
    reset: reset_1.reset,
    show: show_1.show
};
