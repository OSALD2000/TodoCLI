import { Command } from "../model/Comand";
import { TodoList } from "../model/Todo";

export const done = (command: Command) => {
    const todos = TodoList.load();
    const todo = todos.deleteTodo(command.value as number, false);
    if (todo) {
        todos.addToDone(todo);
        todos.save();
    }
}
