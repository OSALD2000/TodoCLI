#!/usr/bin/env node
import * as fs from "fs";
import path from "path";
import * as input from "node:readline";
import { getInfo } from "./utils/help_info";
import { Todos } from "./Todo";
import { createID } from "./utils/create_Id";
import { rmdirSync, rmSync } from "fs";
import { plainToInstance } from 'class-transformer';
import { filter_input } from "./utils/filter_input";
import { isInsideGitRepositiry } from "./utils/isInsideGitRepositiry";
import { addTodoGitIgnore } from './utils/addTodoGitIgnore';
import { removeTodoGitIgnore } from "./utils/removeTodoGitIgnore";

const args = process.argv;

const readline = input.createInterface({
    input: process.stdin,
    output: process.stdout,
})

if (args.length == 2 || args.find(arg => arg === '-h' || arg === '--help')) {
    console.log(getInfo());
    process.exit();
}

else if (args.find(arg => arg === '--create')) {
    if (!fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
        let created = false;

        fs.mkdirSync(path.join(process.cwd(), ".todo"));

        created = true

        if (created) {
            let name = "todo_list";

            readline.question("Name von Todo List ? \n", (answer) => {
                if (answer.trim().length !== 0) {
                    name = answer;
                }

                const todos = new Todos(createID(), name);

                if(args.find(arg => arg === '-ig')){
                    if(isInsideGitRepositiry()[0]){
                        addTodoGitIgnore(process.cwd());
                        todos.gitignore = true;
                    }
                }

                console.log("todo list created !! \n");

                todos.save();

                readline.close();                   
            })

            readline.on('close', () => {
                process.exit();
            })
        }
       
    } else {
        console.log("hier ist schon eine Todo List erstellt");
        process.exit();
    }
}


else if (args.find(arg => arg === '--show')) {
    if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
        const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

        const todo = plainToInstance(Todos, [data])[0];

        console.log("Todo Title: ", todo.list_name);

        todo.print_all_todos();
    } else {
        console.log("es existiert kein Todo-list hier!!");
    }
    process.exit();
}

else if (args.find(arg => arg === '--add')) {
    if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
        const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

        const todos = plainToInstance(Todos, [data])[0];

        const idx_start = args.findIndex(arg => arg === '--add');
    
        const input_array = args.slice(idx_start + 1);

        const text = input_array.join(" ")

        if (args.length > idx_start && filter_input(text))
        {
            todos.addTodo(text);
            todos.save();

            console.log("OK");
            
        }else{
            console.log("geben Sie gueltiges input");   
        }

    } else {
        console.log("es existiert kein Todo-list hier!!");
    }
    process.exit();

}
else if (args.find(arg => arg === '--done')){
    if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
        const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

        const todos = plainToInstance(Todos, [data])[0];

        const idx = args.findIndex(arg => arg === '--done') + 1;

        const index_to_move = parseInt(args[idx]);
        console.log(index_to_move, args.length, idx);
        
        if (idx === (args.length - 1) && !Number.isNaN(index_to_move) ) {
            const todo = todos.deleteTodo(index_to_move)!;
            todos.addToDone(todo);
            todos.save();
            console.log("OK");
        } else{
            console.log("geben Sie gueltiges input");   
        }

    } else {
        console.log("es existiert kein Todo-list hier!!");
    }
    process.exit();
}

else if (args.find(arg => arg === '--delete')) {
    if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {

        const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));

        const todos = plainToInstance(Todos, [data])[0];

        const idx = args.findIndex(arg => arg === '--delete') + 1;

        const index_to_delete = parseInt(args[idx]);
        
        if (idx === (args.length - 1) && index_to_delete ) {
            todos.deleteTodo(index_to_delete);
            todos.save();
            console.log("OK");
        } else{
            console.log("geben Sie gueltiges input");   
        }

    } else {
        console.log("es existiert kein Todo-list hier!!");
    }
    process.exit();
}

else if (args.find(arg => arg === '-r' || arg === '--reset')) {
    if (fs.existsSync(path.resolve(process.cwd(), ".todo"))) {
        rmSync(path.resolve(process.cwd(), ".todo/todo.json"));
        rmdirSync(path.resolve(process.cwd(), ".todo"));
        const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".todo/todo.json"), 'utf8'));
        const todos = plainToInstance(Todos, [data])[0];

        if (todos.gitignore){
            removeTodoGitIgnore(process.cwd());
            todos.gitignore = false;
            todos.save();
        }

        console.log('Todo List gelöscht');
    } else {
        console.log("es existiert kein Todo-list hier!!");
    }
    process.exit();
}

else {
    console.log("befehl kann nicht gefunden werden !!! \n");
    process.exit();
}

