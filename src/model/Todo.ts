import { randomUUID } from "crypto";
import * as fs from "fs";
import path from "path";
import { fail } from "../utils/fail";

const todoFile = () => path.resolve(process.cwd(), ".todo/todo.json");

const formatDate = (iso: string) => {
    const date = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

class Todo {
    constructor(public id: string, public text: string, public date: string, public hidden: boolean = false) { }
}

export class TodoList {
    private todos: Todo[] = [];
    private todos_done: Todo[] = [];
    public gitignore = false;

    constructor(private id: string, public list_name: string) { }

    public static load(): TodoList {
        return Object.assign(new TodoList("", ""), JSON.parse(fs.readFileSync(todoFile(), "utf8")));
    }

    public static create(name: string): TodoList {
        return new TodoList(randomUUID(), name);
    }

    private static isValidIndex(idx: number, list: Todo[]): boolean {
        if (Number.isInteger(idx) && idx >= 0 && idx < list.length) return true;
        fail(`Invalid index: ${idx}`);
        return false;
    }

    public addTodo(text: string): boolean {
        if (text.trim().length < 2) {
            fail("Todo text needs at least 2 characters.");
            return false;
        }
        this.todos.push(new Todo(randomUUID(), text.trim(), new Date().toISOString()));
        return true;
    }

    public deleteTodo(idx: number, done: boolean): Todo | undefined {
        const list = done ? this.todos_done : this.todos;
        if (TodoList.isValidIndex(idx, list)) return list.splice(idx, 1)[0];
    }

    public addToDone(todo: Todo) {
        todo.date = new Date().toISOString();
        this.todos_done.push(todo);
    }

    public hideTodo(idx: number): boolean {
        if (!TodoList.isValidIndex(idx, this.todos_done)) return false;
        this.todos_done[idx].hidden = true;
        return true;
    }

    public save() {
        fs.writeFileSync(todoFile(), JSON.stringify(this, null, 5));
    }

    public get all_todos() {
        return this.todos;
    }

    public print_all_todos(done: boolean, hidden: boolean) {
        // Keyed by the real index so the numbers shown work with --done/--delete/--hide.
        if (!done) {
            console.log('\x1b[33m%s\x1b[0m', "Open todos:");
            console.table(Object.fromEntries(this.todos.map((todo, idx) => [idx, { Created: formatDate(todo.date), Todo: todo.text }])));
        }
        console.log('\x1b[36m%s\x1b[0m', "Done todos:");
        console.table(Object.fromEntries(this.todos_done
            .map((todo, idx) => [idx, todo] as const)
            .filter(([, todo]) => hidden || !todo.hidden)
            .map(([idx, todo]) => [idx, { Done: formatDate(todo.date), Todo: todo.text }])));
    }
}
