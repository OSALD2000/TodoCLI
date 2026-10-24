import { Command } from "../model/Comand";
import * as fs from "fs";
import path from "path";
import { TodoList } from "../model/Todo";
import { removeTodoGitIgnore } from "../utils/gitignore";

export const reset = (_: Command) => {
    if (TodoList.load().gitignore) removeTodoGitIgnore(process.cwd());

    fs.rmSync(path.resolve(process.cwd(), ".todo"), { recursive: true, force: true });
    console.log("Todo list deleted.");
}
