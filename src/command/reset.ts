import { Command } from "../model/Comand";
import * as fs from "fs";
import path from "path";
import {TodoList} from "../model/Todo";
import { plainToInstance } from 'class-transformer';
import { removeTodoGitIgnore } from "../utils/removeTodoGitIgnore";
import { rmdirSync, rmSync } from "fs";

export const reset = (command : Command) =>{
    const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

    const todos = plainToInstance(TodoList, [data])[0];

    if(todos.gitignore){
        removeTodoGitIgnore(process.cwd());
    }

    rmSync(path.resolve(process.cwd(), ".todo/todo.json"));
    rmdirSync(path.resolve(process.cwd(), ".todo"));
}