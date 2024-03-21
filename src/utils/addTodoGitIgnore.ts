import * as fs from "fs";
import path from "path";

export const addTodoGitIgnore = (path_parmeter: string): boolean => {
    let git_path = path.join(path_parmeter, ".git");
    if (fs.existsSync(git_path)) {
        const gitignor_path = path.join(path_parmeter, ".gitignore");
        if (fs.existsSync(gitignor_path)) {
            try {
                const data = fs.readFileSync(gitignor_path,'utf8');
                
                const lines = (data.split("\n"))
                
                if(lines.find(ignored => ignored.trim() === ".todo")){
                    return true
                }else{
                    lines.push(".todo");

                    const updatedContent = lines.join("\n");
                    
                    fs.writeFileSync(gitignor_path, updatedContent, 'utf8');
                
                    return true
                }
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