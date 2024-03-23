import { Command } from "../model/Comand";
import * as fs from "fs";
import path from "path";
import {TodoList} from "../model/Todo";
import { plainToInstance } from 'class-transformer';

export const delete_command = (command : Command) =>{

    const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

    const todos = plainToInstance(TodoList, [data])[0];

    const idx = command.value as number;

    if (!Number.isNaN(idx)) {
        if(command.has_option){
            todos.deleteTodo(idx, true);
        }
        else{
            todos.deleteTodo(idx, false);
        }
        todos.save();
    } else{
        console.error("geben Sie gueltiges input");   
    }

}