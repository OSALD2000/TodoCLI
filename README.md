# todo-cli

[English](#english) · [Deutsch](#deutsch)

## English

`todo-cli` keeps a small todo list per directory, stored in `.todo/todo.json`.
It is handy for project-local tasks that live next to the code they belong to.
No runtime dependencies.

### Installation

```sh
npm install -g ts_todo_cli
```

Requires Node.js 18 or newer.

### Usage

| Command | Description |
| --- | --- |
| `todo-cli --create` | Create a todo list in the current directory |
| `todo-cli --create -ig` | Create it and add `.todo` to the repository's `.gitignore` |
| `todo-cli --show` | Show open and done todos |
| `todo-cli --show -d` | Show done todos only |
| `todo-cli --show -hidden` | Show done todos including hidden ones |
| `todo-cli --add <text>` | Add a todo |
| `todo-cli --done <index>` | Mark an open todo as done |
| `todo-cli --delete <index>` | Delete an open todo |
| `todo-cli --delete -d <index>` | Delete a done todo |
| `todo-cli --hide <index>` | Hide a done todo |
| `todo-cli --ignore` / `--ignore -n` | Add `.todo` to / remove it from `.gitignore` |
| `todo-cli -r`, `--reset` | Delete the todo list in the current directory |
| `todo-cli -h`, `--help` | Show help |

Indexes are the numbers shown by `--show`. Commands can be chained:

```sh
todo-cli --create
todo-cli --add Buy milk --add Write release notes
todo-cli --done 0
todo-cli --show
```

The exit code is `1` when a command fails, so it can be used in scripts.

### Development

```sh
npm install
npm test        # builds and runs the CLI tests in a temporary directory
```

## Deutsch

`todo-cli` verwaltet eine kleine Aufgabenliste pro Ordner in `.todo/todo.json`.
Praktisch für projektbezogene Aufgaben direkt neben dem passenden Code.
Keine Laufzeit-Abhängigkeiten.

### Installation

```sh
npm install -g ts_todo_cli
```

Benötigt Node.js 18 oder neuer.

### Verwendung

| Befehl | Beschreibung |
| --- | --- |
| `todo-cli --create` | Liste im aktuellen Ordner anlegen |
| `todo-cli --create -ig` | Anlegen und `.todo` in die `.gitignore` des Repositorys eintragen |
| `todo-cli --show` | Offene und erledigte Aufgaben anzeigen |
| `todo-cli --show -d` | Nur erledigte Aufgaben anzeigen |
| `todo-cli --show -hidden` | Erledigte Aufgaben inklusive ausgeblendeter anzeigen |
| `todo-cli --add <Text>` | Aufgabe hinzufügen |
| `todo-cli --done <Index>` | Offene Aufgabe als erledigt markieren |
| `todo-cli --delete <Index>` | Offene Aufgabe löschen |
| `todo-cli --delete -d <Index>` | Erledigte Aufgabe löschen |
| `todo-cli --hide <Index>` | Erledigte Aufgabe ausblenden |
| `todo-cli --ignore` / `--ignore -n` | `.todo` in `.gitignore` eintragen / entfernen |
| `todo-cli -r`, `--reset` | Liste im aktuellen Ordner löschen |
| `todo-cli -h`, `--help` | Hilfe anzeigen |

Der Index ist die Nummer aus `--show`. Befehle lassen sich verketten (siehe Beispiel oben).
Bei Fehlern endet das Programm mit Exit-Code `1`.

### Entwicklung

```sh
npm install
npm test        # baut das Projekt und testet die CLI in einem temporären Ordner
```

## License

MIT, see [LICENSE](LICENSE).
