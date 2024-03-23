import { Command } from "../model/Comand";
import { COMMANDS } from "../model/COMMANDS";
import { run as run_command } from "../command/run";
import * as fs from "fs";
import path from "path";

export function command_executer(command: Command) {
    if (command.befehl === COMMANDS.HELP_LONG || command.befehl === COMMANDS.HELP_SHORT) {
        run_command.help(command);
    }
    else if (command.befehl === COMMANDS.CREATE) {
        if (!fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
            run_command.create(command);
        } else {
            console.error("todo List existiert in dem Ordner !!");
        }
    } else if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
        switch (command.befehl) {
            case COMMANDS.ADD:
                run_command.add(command);
                break;

            case COMMANDS.DELETE:
                run_command.delete(command);
                break;

            case COMMANDS.DONE:
                run_command.done(command);
                break;

            case COMMANDS.HIDE:
                run_command.hide(command);
                break;

            case COMMANDS.IGNORE:
                run_command.ignore(command);
                break;

            case COMMANDS.RESET_LONG:
            case COMMANDS.RESET_SHORT:
                if (fs.existsSync(path.resolve(process.cwd(), ".todo/todo.json"))) {
                    run_command.reset(command);
                }
                break;

            case COMMANDS.SHOW:
                run_command.show(command);
                break;

            default:
                console.error("command not found!!");
                break;
        }
    } else {
        console.error("todo List existiert nicht in dem Ordner !!");
    }
}