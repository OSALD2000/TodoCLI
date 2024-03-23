<h1>todo-cli</h1>
    <p><code>todo-cli</code> is a command-line tool for managing your todo lists directly from your terminal. With <code>todo-cli</code>, you can easily create, view, modify, and delete tasks in your todo lists without leaving the command line environment.</p>
    <h2>Installation</h2>
    <p>To install <code>todo-cli</code>, simply run:</p>
    <pre><code>npm link ts_todo_cli</code></pre>
    <p>This will install <code>todo-cli</code> globally on your system, allowing you to access it from anywhere in your terminal.</p>
    <h2>Usage</h2>
    <h3>Creating a Todo List</h3>
    <p>To create a new todo list in the current directory, use the following command:</p>
    <pre><code>todo-cli --create</code></pre>
    <p>You can also create a new todo list and add it to <code>.gitignore</code> by using the <code>-ig</code> option:</p>
    <pre><code>todo-cli --create -ig</code></pre>
    <h3>Viewing Todo Lists</h3>
    <p>To view the current todo list in the current directory, use:</p>
    <pre><code>todo-cli --show</code></pre>
    <p>To show only the completed tasks in the todo list, use:</p>
    <pre><code>todo-cli --show -d</code></pre>
    <p>To show the hidden completed tasks in the todo list, use:</p>
    <pre><code>todo-cli --show -hidden</code></pre>
    <h3>Adding Tasks</h3>
    <p>To add a new task to the current todo list, use:</p>
    <pre><code>todo-cli --add "Your task description"</code></pre>
    <h3>Deleting Tasks</h3>
    <p>To delete a task from the current todo list based on its index, use:</p>
    <pre><code>todo-cli --delete &lt;Index&gt;</code></pre>
    <p>To delete a task from the completed todo list based on its index, use:</p>
    <pre><code>todo-cli --delete -d &lt;Index&gt;</code></pre>
    <h3>Marking Tasks as Done</h3>
    <p>To mark a task as done in the current todo list based on its index, use:</p>
    <pre><code>todo-cli --done &lt;Index&gt;</code></pre>
    <h3>Hiding Tasks</h3>
    <p>To hide a task from the completed todo list based on its index, use:</p>
    <pre><code>todo-cli --hide &lt;Index&gt;</code></pre>
    <h3>Ignoring Todo Lists</h3>
    <p>To add the todo list to <code>.gitignore</code>, use:</p>
    <pre><code>todo-cli --ignore</code></pre>
    <p>To remove the todo list from <code>.gitignore</code>, use:</p>
    <pre><code>todo-cli --ignore -n</code></pre>
    <h3>Resetting Todo Lists</h3>
    <p>To delete the current todo list in the current directory, use:</p>
    <pre><code>todo-cli --reset</code></pre>
    <h2>Examples</h2>
    <p>Here are some examples to get you started:</p>
    <pre><code>todo-cli --create                                  # Creates a new todo list in the current directory.
todo-cli --show                                    # Shows the current todo list in the current directory.
todo-cli --add "Grocery shopping"                  # Adds "Grocery shopping" to the current todo list in the current directory.
todo-cli --delete 1                                # Deletes the task with index 1 from the current todo list in the current directory.
todo-cli --done 2                                  # Marks the task with index 2 as done in the current todo list in the current directory.
todo-cli -r                                        # Deletes the current todo list in the current directory.
</code></pre>
    <h2>Contributing</h2>
    <p>Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on <a href="https://github.com/OSALD2000/todo-cli">GitHub</a>.</p>
    <h2>License</h2>
    <p>This project is licensed under the MIT License - see the LICENSE file for details.</p>
