import { createID } from "../utils/create_Id";
import * as fs from "fs";
import path from "path";

class Todo{
    constructor(public id:string, public text:string, public date:string, public hidden:boolean=false){}
}

export class TodoList {
    private todos: Todo[] = [];
    private todos_done: Todo[] = [];
    public gitignore = false;
    
    constructor(private id:string, public list_name:string){}

    public addTodo(text:string){
        if(text.trim().length > 1){
            const todo = new Todo(createID(), text, (new Date()).toISOString());
            this.todos.push(todo);
        }else console.log("mind. 3 Zeichen");
    }

    public deleteTodo(idx:number, done:boolean) : Todo | void
    {
        if(done){            
            if (idx < this.todos_done.length)
            {
                return this.todos_done.splice(idx,1)[0]
            }else{
                console.log("unvalid Index !!!");
            }
        }else{
            if (idx < this.todos.length)
            {
                return this.todos.splice(idx,1)[0]
            }else{
                console.log("unvalid Index !!!");
            }
        }
    }

    public addToDone(todo:Todo){
        todo.date = new Date().toISOString();
        this.todos_done.push(todo);
    }

    hideTodo(idx: number) {
        if (idx < this.todos_done.length)
        {
            return this.todos_done[idx].hidden = true;
        }else{
            console.log("unvalid Index !!!");
        }
    }

    public save(){
        fs.writeFileSync(path.resolve(process.cwd(), ".todo/todo.json"), JSON.stringify(this, null, 5));
    }

    public get all_todos(){
        return this.todos;
    }

    public print_all_todos(done:boolean, hidden:boolean){
        
        if(!done){
            console.log('\x1b[33m%s\x1b[0m', "Aktuelle Todos: ");
            let filtterd_todos = this.todos.filter(todo => !todo.hidden);
            
            const table = filtterd_todos.map((todo) => {
                const create_date = new Date(todo.date);
                
                const tag = create_date.getDate();
                const monat = create_date.getMonth() + 1;
                const jahr = create_date.getFullYear();
                let stunden = create_date.getHours();
                let minuten = create_date.getMinutes();


                const formatiertesDatum = `${tag}/${monat}/${jahr} ${stunden}:${minuten} `;

                return {Create_date: formatiertesDatum, Todo: todo.text}
            });

            console.table(table)    
        }
        console.log('\x1b[36m%s\x1b[0m', "Erledigt Todos: ");

        let filtterd_todos_done;

        if(hidden){
            filtterd_todos_done = this.todos_done;
        }else{
            filtterd_todos_done = this.todos_done.filter(todo => !todo.hidden);
        }

        const table_done = filtterd_todos_done.map((todo) => {
            
            const create_date = new Date(todo.date);
            
            const tag = create_date.getDate();
            const monat = create_date.getMonth() + 1;
            const jahr = create_date.getFullYear();
            let stunden = create_date.getHours();
            let minuten = create_date.getMinutes();


            const formatiertesDatum = `${tag}/${monat}/${jahr} ${stunden}:${minuten} `;

            return {Done_date: formatiertesDatum, Erledigt_Todos: todo.text}
        
        });
        console.table(table_done)
    }
}

