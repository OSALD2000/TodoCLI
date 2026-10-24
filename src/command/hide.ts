import { Command } from "../model/Comand";
import { TodoList } from "../model/Todo";

export const hide = (command: Command) => {
    const todos = TodoList.load();
    if (todos.hideTodo(command.value as number)) todos.save();
}
