import * as fs from "fs";
import path from "path";

export const removeTodoGitIgnore = (path_parmeter: string): boolean => {
    let git_path = path.join(path_parmeter, ".git");
    if (fs.existsSync(git_path)) {
            const gitignor_path = path.join(path_parmeter, ".gitignore");
            try {
                const data = fs.readFileSync(gitignor_path,'utf8');

                const lines = data.split("\n");

                const filteredLines = lines.filter(line => line.trim() !== ".todo");

                const updatedContent = filteredLines.join("\n");
                
                fs.writeFileSync(gitignor_path, updatedContent, 'utf8');
                
                return true
            } catch {
                return false;
            }
    } else {
        return removeTodoGitIgnore(path.join(path_parmeter, ".."))
    }
}