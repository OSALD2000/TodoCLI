import { Command } from "../model/Comand";
import { TodoList } from "../model/Todo";

export const delete_command = (command: Command) => {
    const todos = TodoList.load();
    if (todos.deleteTodo(command.value as number, command.has_option)) todos.save();
}
