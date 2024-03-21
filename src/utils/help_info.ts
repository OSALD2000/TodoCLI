export const getInfo = () => (`
            Verwendung: todo-cli [Optionen] [Argumente]

            Optionen:
            --create             Erstellt eine neue Todo-Liste im aktuellen Verzeichnis.
            --show               Zeigt die aktuelle Todo-Liste im aktuellen Verzeichnis an.
            --show -d            Zeigt die erlidigte tasks in Todo-Liste im aktuellen Verzeichnis an.
            --add <Text>         Fügt eine neue Aufgabe zur aktuellen Todo-Liste im aktuellen Verzeichnis hinzu.
            --delete <Index>     Löscht eine Aufgabe aus der aktuellen Todo-Liste im aktuellen Verzeichnis anhand des Index.
            --done <Index>       Markiert eine Aufgabe als erledigt in der aktuellen Todo-Liste im aktuellen Verzeichnis.
            -r, --reset          Löscht die aktuelle Todo-Liste im aktuellen Verzeichnis.
            -h, --help           Zeigt Hilfe zur Verwendung der CLI an.

            Argumente:
            <Text>               Der Text für eine neue Aufgabe, der mit --add verwendet wird.
            <Index>              Der Index der Aufgabe, die mit --delete oder --done gelöscht bzw. als erledigt markiert werden soll.

            Beispiele:
            todo-cli --create                                  # Erstellt eine neue Todo-Liste im aktuellen Verzeichnis.
            todo-cli --show                                    # Zeigt die aktuelle Todo-Liste im aktuellen Verzeichnis an.
            todo-cli --add "Einkaufen"                         # Fügt "Einkaufen" zur aktuellen Todo-Liste im aktuellen Verzeichnis hinzu.
            todo-cli --delete 1                                # Löscht die Aufgabe mit Index 1 aus der aktuellen Todo-Liste im aktuellen Verzeichnis.
            todo-cli --done 2                                  # Markiert die Aufgabe mit Index 2 als erledigt in der aktuellen Todo-Liste im aktuellen Verzeichnis.
            todo-cli -r                                        # Löscht die aktuelle Todo-Liste im aktuellen Verzeichnis.
`)