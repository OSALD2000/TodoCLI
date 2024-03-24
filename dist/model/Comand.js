"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
var command_executer_1 = require("../utils/command_executer");
var Command = /** @class */ (function () {
    function Command(befehl, has_value, has_option, value, command_options) {
        this.befehl = befehl;
        this.has_value = has_value;
        this.has_option = has_option;
        this.value = value;
        this.command_options = command_options;
    }
    Command.prototype.run = function () {
        (0, command_executer_1.command_executer)(this);
    };
    return Command;
}());
exports.Command = Command;
