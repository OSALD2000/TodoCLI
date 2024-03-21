export const getInfo = () => (`
            Usage: todo-cli [Options] [Arguments]

            Options:
            --create             Creates a new todo list in the current directory.
            --create -ig         Creates a new todo list and adds it to .gitignore.
            --show               Shows the current todo list in the current directory.
            --show -d            Shows the completed tasks in the todo list in the current directory.
            --show -hidden       Shows the hidden completed tasks in the todo list in the current directory.
            --add <Text>         Adds a new task to the current todo list in the current directory.
            --delete <Index>     Deletes a task from the current todo list in the current directory based on the index.
            --delete -d <Index>  Deletes a task from the done todo list in the current directory based on the index.
            --done <Index>       Marks a task as done in the current todo list in the current directory.
            --hide <Index>       Hides a task from the done todo list in the current directory based on the index.
            --ignore             Add todo list to .gitignore
            --ignore -n          Removes todo list from .gitignore
            -r, --reset          Deletes the current todo list in the current directory.
            -h, --help           Shows help for using the CLI.

            Arguments:
            <Text>               The text for a new task to be used with --add.
            <Index>              The index of the task to be deleted or marked as done using --delete or --done.

            Examples:
            todo-cli --create                                  # Creates a new todo list in the current directory.
            todo-cli --show                                    # Shows the current todo list in the current directory.
            todo-cli --add "Grocery shopping"                  # Adds "Grocery shopping" to the current todo list in the current directory.
            todo-cli --delete 1                                # Deletes the task with index 1 from the current todo list in the current directory.
            todo-cli --done 2                                  # Marks the task with index 2 as done in the current todo list in the current directory.
            todo-cli -r                                        # Deletes the current todo list in the current directory.
`)
