import { COMMANDS } from "./COMMANDS";
import { run as run_command } from "../command/run";
import * as fs from "fs";
import path from "path";

function command_executer(command : Command) {
    switch (command.befehl) {
        case COMMANDS.HELP_SHORT:
        case COMMANDS.HELP_LONG:
            run_command.help(command);
            break;

        case COMMANDS.CREATE:
            if (!fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
                run_command.create(command);
            }else{
                console.error("todo List existiert in dem Ordner !!");
            }
            break;

        case COMMANDS.ADD:
            if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
                run_command.add(command);
            }
            break;

        case COMMANDS.DELETE:
            if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
                run_command.delete(command);
            }
            break;

        case COMMANDS.DONE:
            if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
                run_command.done(command);
            }
            break;

        case COMMANDS.HIDE:
            if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
                run_command.hide(command);
            }
            break;

        case COMMANDS.IGNORE:
            if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
                run_command.ignore(command);
            }
            break;

        case COMMANDS.RESET_LONG:
        case COMMANDS.RESET_SHORT:
            if(fs.existsSync(path.resolve(process.cwd(), ".todo"))){
                if(fs.existsSync(path.resolve(process.cwd(), ".todo/todo.json"))){
                    run_command.reset(command);
                }
            }
            break;

        case COMMANDS.SHOW:
            if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
                run_command.show(command);
            }
            break;

        default:
            console.error("command not found!!");
            break;
    }
}

export class Command {
    constructor(public befehl: COMMANDS, public has_value: boolean, public has_option: boolean, public value?: string | number, public command_options?: COMMANDS[]) { }

    public run(){
        command_executer(this);
    }
}