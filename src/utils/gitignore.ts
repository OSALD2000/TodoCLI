import * as fs from "fs";
import path from "path";

export const findGitRoot = (dir: string): string | null => {
    if (fs.existsSync(path.join(dir, ".git"))) return dir;
    const parent = path.dirname(dir);
    return parent === dir ? null : findGitRoot(parent);
}

export const addTodoGitIgnore = (dir: string): boolean => {
    const root = findGitRoot(dir);
    if (!root) return false;
    const file = path.join(root, ".gitignore");
    const content = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
    if (!content.split("\n").some(line => line.trim() === ".todo")) {
        const separator = content && !content.endsWith("\n") ? "\n" : "";
        fs.writeFileSync(file, `${content}${separator}.todo\n`, "utf8");
    }
    return true;
}

export const removeTodoGitIgnore = (dir: string): boolean => {
    const root = findGitRoot(dir);
    const file = root && path.join(root, ".gitignore");
    if (!file || !fs.existsSync(file)) return false;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    fs.writeFileSync(file, lines.filter(line => line.trim() !== ".todo").join("\n"), "utf8");
    return true;
}
