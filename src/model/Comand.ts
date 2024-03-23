import { COMMANDS } from "./COMMANDS";
import { run as run_command } from "../command/run";
export class Command
{
    constructor(public befehl:COMMANDS, public has_value:boolean, public has_option:boolean, public value?:string | number, public command_options?:COMMANDS[])
    {}

    public run()
    {
        switch (this.befehl) {
            case COMMANDS.ADD:
                run_command.add(this);
                break;

            case COMMANDS.CREATE:
                run_command.create(this);
                break;

            case COMMANDS.DELETE:
                run_command.delete(this);
                break;

            case COMMANDS.DONE:
                run_command.done(this);
                break;

            case COMMANDS.HELP_SHORT:
            case COMMANDS.HELP_LONG:
                run_command.help(this);
                break;

            case COMMANDS.HIDE:
                run_command.hide(this);
                break;

            case COMMANDS.IGNORE:
                run_command.ignore(this);
                break;

            case COMMANDS.RESET_LONG:
            case COMMANDS.RESET_SHORT:
                run_command.reset(this);
                break;

            case COMMANDS.SHOW:
                run_command.show(this);
                break;

            default:

                console.error("command not found!!");
                break;
        }
        
    }

}