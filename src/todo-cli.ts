#!/usr/bin/env node

import { create_commands } from "./utils/create_commands";
import { fail } from "./utils/fail";

const args = process.argv.slice(2);

try {
    create_commands(args.length > 0 ? args : ["--help"]).forEach(command => command.run());
} catch (error) {
    fail(`Error: ${error instanceof Error ? error.message : error}`);
}

process.exit();
