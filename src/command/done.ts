import { Command } from "../model/Comand";
import * as fs from "fs";
import path from "path";
import {TodoList} from "../model/Todo";
import { plainToInstance } from 'class-transformer';

export const done = (command : Command) =>{
    const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

    const todos = plainToInstance(TodoList, [data])[0];
    
    const idx = command.value as number;

    if(!Number.isNaN(idx)){        
        const todo = todos.deleteTodo(command.value as number, false)!;
        todos.addToDone(todo);
        todos.save();
    } else{
        console.error("geben Sie gueltiges input");   
    }

}