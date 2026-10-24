import { Command } from "../model/Comand";
import { TodoList } from "../model/Todo";
import { COMMANDS } from "../model/COMMANDS";

export const show = (command: Command) => {
    const todo = TodoList.load();

    console.log("Todo list:", todo.list_name);

    const options = command.command_options ?? [];
    const hidden = options.includes(COMMANDS.SHOW_HIDDEN);
    const done = hidden || options.includes(COMMANDS.SHOW_ONLY_DONE);

    todo.print_all_todos(done, hidden);
}
