import { Command } from "../model/Comand";
import { TodoList } from "../model/Todo";

export const add = (command: Command) => {
    const todos = TodoList.load();
    if (todos.addTodo(command.value as string)) todos.save();
}
