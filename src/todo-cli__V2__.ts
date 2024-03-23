#!/usr/bin/env node

import { create_commands } from "./utils/create_commands";

const args = process.argv.slice(2);

const commands = create_commands(args);

console.log(commands);

// commands.forEach(command => command.run());

// process.exit();

