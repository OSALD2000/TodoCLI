#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_commands_1 = require("./utils/create_commands");
var args = process.argv.slice(2);
var commands = (0, create_commands_1.create_commands)(args);
commands.forEach(function (command) { return command.run(); });
process.exit();
