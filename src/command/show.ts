import { Command } from "../model/Comand";
import * as fs from "fs";
import path from "path";
import {TodoList} from "../model/Todo";
import { plainToInstance } from 'class-transformer';
import { COMMANDS } from "../model/COMMANDS";

export const show = (command : Command) =>{
        const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

        const todo = plainToInstance(TodoList, [data])[0];

        console.log("Todo Title: ", todo.list_name);

        let done = false;
        let hidden = false; 

        if(command.has_option){
            done  = command.command_options!.includes(COMMANDS.SHOW_ONLY_DONE)!;
            hidden = command.command_options!.includes(COMMANDS.SHOW_HIDDEN);
        }

        const show_only_done  = hidden ? hidden : done;
        todo.print_all_todos(show_only_done, hidden);
}