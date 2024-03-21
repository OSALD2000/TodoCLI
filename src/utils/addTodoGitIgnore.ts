import * as fs from "fs";
import path from "path";

export const addTodoGitIgnore = (path_parmeter: string): boolean => {
    let git_path = path.join(path_parmeter, ".git");
    if (fs.existsSync(git_path)) {
        const gitignor_path = path.join(path_parmeter, ".gitignore");
        if (fs.existsSync(gitignor_path)) {
            try {
                fs.readFile(gitignor_path,'utf8', (err, data)=>{
                    if (err) {
                        console.error('Fehler beim Lesen der Datei:', err);
                        return;
                    }

                    const lines = (data.split("\n"))

                    lines.push(".gitignore");
                    
                    const updatedContent = lines.join("\n");

                    fs.writeFileSync(gitignor_path, updatedContent, 'utf8');
                })
                return true
            } catch {
                return false;
            }
        } else {
           try {
                fs.writeFileSync(gitignor_path, ".todo", { encoding: 'utf8', flag: 'w' });
                return true
            } catch {
                return false;
            }
        }
    } else {
        return addTodoGitIgnore(path.join(path_parmeter, ".."))
    }
}