import { Command } from "../model/Comand";
import * as fs from "fs";
import path from "path";
import {TodoList} from "../model/Todo";
import { plainToInstance } from 'class-transformer';

export const hide = (command : Command) =>{
    const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));
    const todos = plainToInstance(TodoList, [data])[0];
    const idx = command.value as number;
    if (!Number.isNaN(idx)) {
            todos.hideTodo(idx);
    }
    todos.save();
}