import { Command } from "../model/Comand";
import * as fs from "fs";
import path from "path";
import { TodoList } from "../model/Todo";
import { addTodoGitIgnore } from "../utils/gitignore";

export const create = (command: Command) => {
    fs.mkdirSync(path.join(process.cwd(), ".todo"));

    const todoList = TodoList.create("todo-list");

    if (command.has_option) {
        if (addTodoGitIgnore(process.cwd())) {
            todoList.gitignore = true;
        } else {
            console.log("Not inside a git repository, .gitignore left unchanged.");
        }
    }

    todoList.save();
    console.log("Todo list created.");
}
