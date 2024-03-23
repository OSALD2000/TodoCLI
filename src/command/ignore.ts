import { Command } from "../model/Comand";
import {TodoList} from "../model/Todo";
import * as fs from "fs";
import path from "path";
import { plainToInstance } from 'class-transformer';
import { isInsideGitRepositiry } from "../utils/isInsideGitRepositiry";
import { removeTodoGitIgnore } from "../utils/removeTodoGitIgnore";
import { addTodoGitIgnore } from "../utils/addTodoGitIgnore";

export const ignore = (command : Command) =>{
    const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

    const todos = plainToInstance(TodoList, [data])[0];

    if (command.has_option){
        if (todos.gitignore){
            if(isInsideGitRepositiry()[0]){
                removeTodoGitIgnore(process.cwd());
                todos.gitignore = false;
                todos.save();
            }
        }
    }else{
        if (!todos.gitignore){
            if(isInsideGitRepositiry()[0]){
                addTodoGitIgnore(process.cwd());
                todos.gitignore = true;
                todos.save();
            }
        }
    }
}