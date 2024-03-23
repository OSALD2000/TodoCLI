import { Command } from "../model/Comand";
import * as fs from "fs";
import path from "path";
import * as input from "node:readline";
import {TodoList} from "../model/Todo";
import { createID } from "../utils/create_Id";
import { isInsideGitRepositiry } from "../utils/isInsideGitRepositiry";
import { addTodoGitIgnore } from "../utils/addTodoGitIgnore";

export const create = (command : Command) =>{
        let created = false;

        fs.mkdirSync(path.join(process.cwd(), ".todo"));

        created = true

        if (created) {
            const name = "todo-list";

            const todoList = new TodoList(createID(), name);

            if(command.has_option){
                    if(isInsideGitRepositiry()[0]){
                        addTodoGitIgnore(process.cwd());
                        todoList.gitignore = true;
                    }
            }

            console.log("todo list created !! \n");

            todoList.save();

        }
}