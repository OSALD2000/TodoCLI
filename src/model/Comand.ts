import { command_executer } from "../utils/command_executer";
import { COMMANDS } from "./COMMANDS";

export class Command {
    constructor(public befehl: COMMANDS, public has_value: boolean, public has_option: boolean, public value?: string | number, public command_options?: COMMANDS[]) { }

    public run() {
        command_executer(this);
    }
}