import { Command } from "../model/Comand"
import { COMMANDS } from "../model/COMMANDS"

const filter_input = (arg:string) : boolean => {
    for (let command in COMMANDS) {
        if (arg === command) {
           return true;
        }
    }
    return false;
}


export const create_commands = (args: string[]) : Command[] =>
{
    let commands : Command[] = [];
    
    if(args.length >=0){

        if(args.find(arg => arg === COMMANDS.ADD)){
            const start_idx = args.findIndex(arg => arg === COMMANDS.ADD) + 1;
            const end_idx = args.findIndex((arg, idx) => idx > start_idx && filter_input(arg));

            let text;
            if(end_idx > 0){
                text = args.slice(start_idx, end_idx)
            }else{
                text = args.slice(start_idx)
            }

            if(text.length > 0){
                console.error("--add : no input text to add !!");
            }else{
                commands.push(new Command(COMMANDS.ADD, true, false, text.join(" ")))
            }
        }

        if(args.find(arg => arg === COMMANDS.SHOW)){

            const command_option : COMMANDS[]= [];

            args.find(arg => arg === COMMANDS.SHOW_ONLY_DONE) ? command_option.push(COMMANDS.SHOW_ONLY_DONE) : false;
            args.find(arg => arg === COMMANDS.SHOW_HIDDEN) ? command_option.push(COMMANDS.SHOW_HIDDEN) : false;

            commands.push(new Command(COMMANDS.SHOW, false, true, undefined, command_option))
        }

        if(args.find(arg => arg === COMMANDS.HELP)){
            commands.push(new Command(COMMANDS.HELP, false, true))
        }

        if(args.find(arg => arg === COMMANDS.CREATE)){
            const command_option : COMMANDS[]= [];

            args.find(arg => arg === COMMANDS.CREATE_MIT_IGNORE) ? command_option.push(COMMANDS.CREATE_MIT_IGNORE) : false;

            commands.push(new Command(COMMANDS.CREATE, false, true, undefined, command_option));
        }

        if(args.find(arg => arg === COMMANDS.DELETE)){
            const command_idx = args.findIndex(arg => arg === COMMANDS.DELETE);
            const idx_to_delete = (command_idx + 1) < args.length ?  +args[command_idx+1] : NaN;

            const command_option : COMMANDS[]= [];
            args.find(arg => arg === COMMANDS.DELETE_DONE) ? command_option.push(COMMANDS.DELETE_DONE) : false;

            if(!Number.isNaN(idx_to_delete)){
                commands.push(new Command(COMMANDS.DELETE, true, true, idx_to_delete, command_option));
            }else{
                console.error("--delete : unvalid index !!!");
            }
        }

        if(args.find(arg => arg === COMMANDS.DONE)){
            const command_idx = args.findIndex(arg => arg === COMMANDS.DONE);
            const idx_to_move = (command_idx + 1) < args.length ?  +args[command_idx+1] : NaN;

            if(!Number.isNaN(idx_to_move)){
                commands.push(new Command(COMMANDS.DELETE, true, false, idx_to_move));
            }else{
                console.error("--done : unvalid index !!!");
            }
        } 
        
        if(args.find(arg => arg === COMMANDS.HIDE)){
            const command_idx = args.findIndex(arg => arg === COMMANDS.HIDE);
            const idx_to_hide = (command_idx + 1) < args.length ?  +args[command_idx+1] : NaN;

            if(!Number.isNaN(idx_to_hide)){
                commands.push(new Command(COMMANDS.DELETE, true, false, idx_to_hide));
            }else{
                console.error("--done : unvalid index !!!");
            }
        }

        if(args.find(arg => arg === COMMANDS.RESET_LONG || arg === COMMANDS.RESET_SHORT)){
            commands.push(new Command(COMMANDS.RESET_LONG, false, false));
        }

        if(args.find(arg => arg === COMMANDS.IGNORE)){
            const command_option : COMMANDS[]= [];
            args.find(arg => arg === COMMANDS.NOT_IGNORE) ? command_option.push(COMMANDS.NOT_IGNORE) : false;

            commands.push(new Command(COMMANDS.IGNORE, false, true, undefined, command_option));
        }

        if(commands.length ===0){
            console.error("command not dound !!");
        }

        return commands;
    }else{
        return []
    }
}