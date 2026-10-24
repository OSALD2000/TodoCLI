import { Command } from "../model/Comand";
import { TodoList } from "../model/Todo";
import { addTodoGitIgnore, removeTodoGitIgnore } from "../utils/gitignore";
import { fail } from "../utils/fail";

export const ignore = (command: Command) => {
    const todos = TodoList.load();
    const ignored = !command.has_option;

    if (todos.gitignore === ignored) return;

    const changed = ignored ? addTodoGitIgnore(process.cwd()) : removeTodoGitIgnore(process.cwd());
    if (!changed) return fail("Not inside a git repository, .gitignore left unchanged.");

    todos.gitignore = ignored;
    todos.save();
}
