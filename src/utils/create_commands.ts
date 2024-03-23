import { SocketAddress } from "net";
import { Command } from "../model/Comand"
import { COMMANDS } from "../model/COMMANDS"

const getCommandsIdx = (args: string[]): number[] => {
    const indexs_array = [];
     
    args.forEach((arg, idx)=>{
      if(Object.values(COMMANDS).includes(arg as COMMANDS)){        
        indexs_array.push(idx)
      }
    })

    indexs_array.push(-1);

    return indexs_array;
}

const getCommandRange = (start_idx:number, indexs_array:number[]) : [number, number] => {
    return [ indexs_array[start_idx] + 1 , indexs_array[start_idx + 1] ]
}

export const create_commands = (args: string[]): Command[] => {
    let commands: Command[] = [];

    if (args.length >= 0) {
        let indexs_array = getCommandsIdx(args);
        console.log(indexs_array);
        
        indexs_array.forEach((command_index, idx) => {
            if (command_index >= 0) {
                
                const [start_idx, end_idx] = getCommandRange(idx, indexs_array);

                if (args[command_index] === COMMANDS.ADD) {                        

                    let text;
                    if (end_idx > 0) {
                        text = args.slice(start_idx, end_idx)
                    } else {
                        text = args.slice(start_idx)
                    }

                    if (text.length < 0) {
                        console.error("--add : no input text to add !!");
                    } else {
                        commands.push(new Command(COMMANDS.ADD, true, false, text.join(" ")))
                    }
                }

                if (args[command_index] === COMMANDS.SHOW) {

                    const command_option: COMMANDS[] = [];
                    
                    if (end_idx > 0) {                        
                        args[start_idx] === COMMANDS.SHOW_ONLY_DONE ? command_option.push(COMMANDS.SHOW_ONLY_DONE) : false;
                        args[start_idx] === COMMANDS.SHOW_HIDDEN ? command_option.push(COMMANDS.SHOW_HIDDEN) : false;
                    }

                    commands.push(new Command(COMMANDS.SHOW, false, true, undefined, command_option))
                }

                if (args[command_index] === COMMANDS.HELP_LONG || args[command_index] === COMMANDS.HELP_SHORT) {
                    commands.push(new Command(COMMANDS.HELP_LONG, false, true))
                }

                if (args[command_index] === COMMANDS.CREATE) {
                    const command_option: COMMANDS[] = [];

                    if (end_idx > 0) {
                        args[start_idx] === COMMANDS.CREATE_MIT_IGNORE ? command_option.push(COMMANDS.CREATE_MIT_IGNORE) : false;
                    }

                    commands.push(new Command(COMMANDS.CREATE, false, true, undefined, command_option));
                }

                if (args[command_index] === COMMANDS.DELETE) {
                    let idx_to_delete;

                    const command_option: COMMANDS[] = [];

                    if (end_idx > 0) {
                        args[start_idx] === COMMANDS.DELETE_DONE ? command_option.push(COMMANDS.DELETE_DONE) : false;
                    } 

                    if(command_option.length > 0){
                        idx_to_delete = (start_idx + 1)  < args.length  ? +args[start_idx + 1] : NaN
                    }else{
                        idx_to_delete = (start_idx)  < args.length  ? +args[start_idx] : NaN
                    }

                    if (!Number.isNaN(idx_to_delete)) {
                        commands.push(new Command(COMMANDS.DELETE, true, true, idx_to_delete, command_option));
                    } else {
                        console.error("--delete : unvalid index !!!");
                    }
                } 

                if (args[command_index] === COMMANDS.DONE) {
                    const idx_to_move = (start_idx) < args.length ? +args[start_idx + 1] : NaN;

                    if (!Number.isNaN(idx_to_move)) {
                        commands.push(new Command(COMMANDS.DELETE, true, false, idx_to_move));
                    } else {
                        console.error("--done : unvalid index !!!");
                    }
                }

                if (args[command_index] === COMMANDS.HIDE) {
                    const idx_to_hide = (start_idx) < args.length ? +args[start_idx] : NaN;

                    if (!Number.isNaN(idx_to_hide)) {
                        commands.push(new Command(COMMANDS.DELETE, true, false, idx_to_hide));
                    } else {
                        console.error("--done : unvalid index !!!");
                    }
                }

                if (args[command_index] === COMMANDS.RESET_LONG || args[command_index] === COMMANDS.RESET_SHORT) {
                    commands.push(new Command(COMMANDS.RESET_LONG, false, false));
                }

                if (args[command_index] === COMMANDS.IGNORE) {
                    const command_option: COMMANDS[] = [];

                    if (end_idx > 0) {
                        args[start_idx] === COMMANDS.NOT_IGNORE ? command_option.push(COMMANDS.NOT_IGNORE) : false;
                    }

                    commands.push(new Command(COMMANDS.IGNORE, false, true, undefined, command_option));
                }
            }

        });

        if (commands.length === 0) {
            console.error("command not dound !!");
        }

        return commands;
    } else {
        return []
    }
}